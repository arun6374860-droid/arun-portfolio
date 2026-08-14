// Synthesized Web Audio API sound effects for interactive developer aesthetic
class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volumeMultiplier: number = 1.6; // Increased audio presence
  private lastHoverTime: number = 0;

  constructor() {
    // Lazy initialized on first user interaction
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Enhanced cursor touching / hovering sound effect with throttle for smooth performance
  public playHover(customPitch: number = 520) {
    try {
      const nowMs = Date.now();
      if (nowMs - this.lastHoverTime < 45) return; // Prevent audio overload on rapid mouse sweep
      this.lastHoverTime = nowMs;

      const ctx = this.getContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      // Crisp, resonant frequency ramp for tactile feedback
      osc.frequency.setValueAtTime(customPitch, now);
      osc.frequency.exponentialRampToValueAtTime(customPitch * 1.8, now + 0.06);
      
      const targetGain = 0.085 * this.volumeMultiplier; // Increased loudness for clear tactile feel
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Crisp, tactile click sound effect
  public playClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Primary click tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(784, now); // G5
      osc.frequency.exponentialRampToValueAtTime(1568, now + 0.09); // G6
      
      const clickGain = 0.12 * this.volumeMultiplier;
      gain.gain.setValueAtTime(clickGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.09);

      // Subtle sub-click for depth
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(320, now);
      subOsc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
      subGain.gain.setValueAtTime(0.06 * this.volumeMultiplier, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.05);
    } catch {
      // Ignore audio failure
    }
  }

  // Celebratory chord sound effect
  public playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.055);
        
        const chordGain = 0.09 * this.volumeMultiplier;
        gain.gain.setValueAtTime(chordGain, now + idx * 0.055);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.22);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.055);
        osc.stop(now + idx * 0.055 + 0.25);
      });
    } catch {
      // Ignore
    }
  }
}

export const sounds = new SoundEffects();

