// Web Audio API based sound effects for dopamine shopping
const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.15) {
  if (!audioContext) return;
  
  try {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    // Silently fail
  }
}

export function playAddToCartSound() {
  if (!audioContext) return;
  // Cheerful ascending arpeggio
  playTone(523.25, 0.12, 'sine', 0.12); // C5
  setTimeout(() => playTone(659.25, 0.12, 'sine', 0.12), 60); // E5
  setTimeout(() => playTone(783.99, 0.15, 'sine', 0.15), 120); // G5
  setTimeout(() => playTone(1046.50, 0.2, 'sine', 0.1), 180); // C6
}

export function playCheckoutSound() {
  if (!audioContext) return;
  // Epic success fanfare
  playTone(523.25, 0.15, 'sine', 0.12);
  setTimeout(() => playTone(659.25, 0.15, 'sine', 0.12), 100);
  setTimeout(() => playTone(783.99, 0.15, 'sine', 0.12), 200);
  setTimeout(() => playTone(1046.50, 0.3, 'sine', 0.15), 300);
  setTimeout(() => playTone(1318.51, 0.4, 'sine', 0.1), 450);
}

export function playClickSound() {
  if (!audioContext) return;
  playTone(800, 0.06, 'sine', 0.08);
}

export function playPopSound() {
  if (!audioContext) return;
  playTone(1200, 0.08, 'sine', 0.1);
  setTimeout(() => playTone(1600, 0.06, 'sine', 0.08), 40);
}

export function playRemoveSound() {
  if (!audioContext) return;
  playTone(400, 0.1, 'sine', 0.08);
  setTimeout(() => playTone(300, 0.15, 'sine', 0.06), 80);
}

export function playCoinSound() {
  if (!audioContext) return;
  playTone(1396.91, 0.08, 'square', 0.06);
  setTimeout(() => playTone(1567.98, 0.12, 'square', 0.06), 80);
}

export function playWinSound() {
  if (!audioContext) return;
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  notes.forEach((note, i) => {
    setTimeout(() => playTone(note, 0.2, 'sine', 0.08), i * 80);
  });
}
