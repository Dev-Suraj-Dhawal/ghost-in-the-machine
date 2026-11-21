// Procedural Web Audio API sound synthesizer
// Completely self-contained - zero audio file dependencies, zero network requests

export type AudioActivityListener = (level: number) => void;
export type VolumeChangeListener = (volume: number, isMuted: boolean) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;

  // Ambient Drone nodes
  private isAmbientDroneOn: boolean = false;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneLfo: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  // Continuous Ambient Wind soundscape nodes
  private isAmbientWindOn: boolean = false;
  private windSource: AudioBufferSourceNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;
  private windLfo: OscillatorNode | null = null;
  private windLfoGain: GainNode | null = null;

  // Activity & volume listeners for UI visualizers
  private listeners: Set<AudioActivityListener> = new Set();
  private volumeListeners: Set<VolumeChangeListener> = new Set();
  private activityTimeout: number | null = null;

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private notifyActivity(level: number = 1.0) {
    this.listeners.forEach((fn) => fn(level));
    if (typeof window !== "undefined") {
      if (this.activityTimeout) window.clearTimeout(this.activityTimeout);
      this.activityTimeout = window.setTimeout(() => {
        this.listeners.forEach((fn) => fn(0));
      }, 350);
    }
  }

  public subscribeActivity(listener: AudioActivityListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyVolume() {
    this.volumeListeners.forEach((fn) => fn(this.volume, this.isMuted));
  }

  public subscribeVolume(listener: VolumeChangeListener): () => void {
    this.volumeListeners.add(listener);
    listener(this.volume, this.isMuted);
    return () => this.volumeListeners.delete(listener);
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.initContext();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (muted && this.isAmbientDroneOn) {
      this.stopAmbientDrone();
    }
    if (muted && this.isAmbientWindOn) {
      this.stopAmbientWind();
    }
    this.notifyVolume();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    this.initContext();
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
    this.notifyVolume();
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleAmbientDrone(): boolean {
    if (this.isAmbientDroneOn) {
      this.stopAmbientDrone();
      return false;
    } else {
      this.startAmbientDrone();
      return true;
    }
  }

  public isDroneActive(): boolean {
    return this.isAmbientDroneOn;
  }

  public startAmbientDrone() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isAmbientDroneOn) return;

    try {
      const now = this.ctx.currentTime;

      // Primary deep hum: 55Hz (Low A)
      const osc1 = this.ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, now);

      // Ethereal subtle octave harmonic: 110Hz + detune
      const osc2 = this.ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(110.5, now);

      // Low pass filter with gentle resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, now);
      filter.Q.setValueAtTime(3.0, now);

      // Slow LFO to breathe subtle nocturnal wind variation (0.12 Hz)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now);
      lfoGain.gain.setValueAtTime(40, now);
      lfo.connect(filter.frequency);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.0001, now);
      droneGain.gain.exponentialRampToValueAtTime(0.045, now + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      lfo.start(now);

      this.droneOsc1 = osc1;
      this.droneOsc2 = osc2;
      this.droneLfo = lfo;
      this.droneGain = droneGain;
      this.isAmbientDroneOn = true;
    } catch {
      // AudioContext policy suppression
    }
  }

  public stopAmbientDrone() {
    if (this.ctx && this.droneGain && this.isAmbientDroneOn) {
      try {
        const now = this.ctx.currentTime;
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

        setTimeout(() => {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneLfo?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneLfo?.disconnect();
          this.droneGain?.disconnect();

          this.droneOsc1 = null;
          this.droneOsc2 = null;
          this.droneLfo = null;
          this.droneGain = null;
          this.isAmbientDroneOn = false;
        }, 900);
      } catch {
        this.isAmbientDroneOn = false;
      }
    } else {
      this.isAmbientDroneOn = false;
    }
  }

  public toggleAmbientWind(): boolean {
    if (this.isAmbientWindOn) {
      this.stopAmbientWind();
      return false;
    } else {
      this.startAmbientWind();
      return true;
    }
  }

  public isWindActive(): boolean {
    return this.isAmbientWindOn;
  }

  public startAmbientWind() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isAmbientWindOn) return;

    try {
      const now = this.ctx.currentTime;
      // 5-second procedural pink-noise loop
      const bufferSize = Math.floor(this.ctx.sampleRate * 5);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.08;
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // Bandpass filter modulated by gentle nocturnal LFO
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(2.4, now);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.18, now);
      lfoGain.gain.setValueAtTime(180, now);
      lfo.connect(filter.frequency);

      const windGain = this.ctx.createGain();
      windGain.gain.setValueAtTime(0.0001, now);
      windGain.gain.exponentialRampToValueAtTime(0.05, now + 1.2);

      source.connect(filter);
      filter.connect(windGain);
      windGain.connect(this.masterGain);

      source.start(now);
      lfo.start(now);

      this.windSource = source;
      this.windFilter = filter;
      this.windLfo = lfo;
      this.windLfoGain = lfoGain;
      this.windGain = windGain;
      this.isAmbientWindOn = true;
    } catch {
      // AudioContext policy suppression
    }
  }

  public stopAmbientWind() {
    if (this.ctx && this.windGain && this.isAmbientWindOn) {
      try {
        const now = this.ctx.currentTime;
        this.windGain.gain.setValueAtTime(this.windGain.gain.value, now);
        this.windGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

        setTimeout(() => {
          this.windSource?.stop();
          this.windLfo?.stop();
          this.windSource?.disconnect();
          this.windLfo?.disconnect();
          this.windLfoGain?.disconnect();
          this.windFilter?.disconnect();
          this.windGain?.disconnect();

          this.windSource = null;
          this.windLfo = null;
          this.windLfoGain = null;
          this.windFilter = null;
          this.windGain = null;
          this.isAmbientWindOn = false;
        }, 900);
      } catch {
        this.isAmbientWindOn = false;
      }
    } else {
      this.isAmbientWindOn = false;
    }
  }

  public playKeyClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const freq = 650 + Math.random() * 300;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
      this.notifyActivity(0.6);
    } catch {
      // AudioContext policy suppression
    }
  }

  public playGlitchBuzz() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (i % 24 > 12 ? 0.9 : -0.9);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(220, now);
      filter.Q.setValueAtTime(4.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      this.notifyActivity(1.0);
    } catch {
      // ignore
    }
  }

  public playCandleChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Sacred Solfeggio 528Hz & peaceful Pythagorean fifth harmonics
      const harmonics = [528, 792, 1056, 1584];

      harmonics.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        const initialVol = 0.16 / (idx + 1);
        gain.gain.setValueAtTime(initialVol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0 + idx * 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 2.5);
      });
      this.notifyActivity(0.9);
    } catch {
      // ignore
    }
  }

  public playSpectralTone(frequency: number = 220, duration: number = 0.8) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.65, now + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
      this.notifyActivity(0.7);
    } catch {
      // ignore
    }
  }

  public playRadarPing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
      this.notifyActivity(0.8);
    } catch {
      // ignore
    }
  }

  public playGeigerClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(1800 + Math.random() * 800, now);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.015);
      this.notifyActivity(0.4);
    } catch {
      // ignore
    }
  }

  public playEtherealWind(duration: number = 1.2) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise approximation for natural wind turbulence
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.08;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(260, now);
      filter.frequency.exponentialRampToValueAtTime(680, now + duration * 0.5);
      filter.frequency.exponentialRampToValueAtTime(220, now + duration);
      filter.Q.setValueAtTime(2.2, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + duration * 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      this.notifyActivity(0.7);
    } catch {
      // ignore
    }
  }

  public playSeanceWhisper(duration: number = 1.6) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.12;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Dual vocal formant filters (F1: ~650Hz, F2: ~1350Hz) simulating a breathy whisper
      const filter1 = this.ctx.createBiquadFilter();
      filter1.type = "bandpass";
      filter1.frequency.setValueAtTime(650, now);
      filter1.Q.setValueAtTime(6.0, now);

      const filter2 = this.ctx.createBiquadFilter();
      filter2.type = "bandpass";
      filter2.frequency.setValueAtTime(1350, now);
      filter2.Q.setValueAtTime(7.0, now);

      const whisperGain = this.ctx.createGain();
      whisperGain.gain.setValueAtTime(0.001, now);
      whisperGain.gain.linearRampToValueAtTime(0.15, now + 0.4);
      whisperGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter1);
      noise.connect(filter2);
      filter1.connect(whisperGain);
      filter2.connect(whisperGain);
      whisperGain.connect(this.masterGain);

      noise.start(now);
      this.notifyActivity(0.85);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
