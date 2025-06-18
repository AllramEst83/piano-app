# Simply Piano Web App

A modern, interactive 32-key piano web application built with Tone.js. Features real-time sound synthesis, extensive audio effects, and built-in song playback capabilities.

## Features

- 32-key piano layout (C3-G5) with both mouse/touch and keyboard input
- Rich sound synthesis with configurable parameters
- Extensive audio effects processing
- Built-in song player with popular melodies
- Responsive design with mobile detection
- Visual feedback for key presses and audio settings

## Core Controls

### Master Controls

- Power button for initializing audio context
- Master volume control (-60dB to +10dB)
- BPM control (40-240) for self-play mode
- Amplifier gain with visual feedback
- Oscillator type selection (Sine, Sine + overtones, Triangle, Square, Sawtooth)

### Sound Shaping

- ADSR Envelope controls
  - Attack (0.001s - 2s)
  - Decay (0.05s - 5s)
  - Sustain (0-1)
  - Release (0-5s)
- Detune control (±100 cents)
- Portamento (0-0.5s)

### Effects Processing

1. **Reverb**

   - Wet mix control
   - Decay time (0.5s - 10s)
   - PreDelay (0-0.1s)

2. **Chorus**

   - Wet mix control
   - Frequency (0.1-5 Hz)
   - Depth (0-1)
   - Stereo spread (0-180°)

3. **Distortion**

   - Amount control
   - Wet mix
   - Oversampling (none, 2x, 4x)

4. **Filter**

   - Types: Lowpass, Highpass, Bandpass, Notch
   - Frequency (20Hz - 20kHz)
   - Resonance (Q: 0.1-10)
   - Roll-off (-12 to -96 dB/oct)

5. **Delay**

   - Time (0.01-1s)
   - Feedback (0-0.9)
   - Wet mix control

6. **Pitch Shift**
   - Shift amount (±24 semitones)
   - Wet mix control

## Keyboard Mapping

### White Keys

- C3–B3: `A S D F G H J`
- C4–B4: `K L ; ' \ Z X`
- C5–G5: `C V B N M`

### Black Keys

- C#3–A#3: `W E T Y U`
- C#4–A#4: `O P [ ] `
- C#5–F#5: `1 2 3`

## Self-Play Mode

Built-in songs include:

- Twinkle Twinkle Little Star
- Ode to Joy

Controls:

1. Select song from dropdown
2. Click "Self play" to start
3. Click again to stop playback

## Technical Stack

- [Tone.js](https://tonejs.github.io/) - Audio synthesis and processing
- Vanilla JavaScript - Core functionality
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- HTML5 - Structure and semantics

## Browser Compatibility

- Optimized for desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile detection with graceful fallback message

## Assets

- Interface icons in `assets/icons/`
- Piano documentation images in `assets/piano_docs/`

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Click the power button to initialize audio
4. Start playing with mouse/touch or keyboard

## Performance Notes

- Uses Web Audio API through Tone.js
- Implements efficient event handling for piano interaction
- Responsive design with mobile detection
- Graceful loading state management

---

Enjoy making music! 🎹 🎵
