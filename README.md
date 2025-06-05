# Mobile Piano Emulator
This is a simple, touch-friendly piano emulator designed for mobile devices, allowing you to play a short range of notes directly in your browser.

# How to Use
Simply tap or click on the white and black keys to play notes. The app is optimized for mobile, so it should take up most of your screen space, providing an easy-to-use interface.

# Features
- Responsive Design: The keyboard layout adapts to various screen sizes, making it ideal for mobile phones and tablets.
- Touch and Mouse Support: Play notes using touch gestures on mobile devices or mouse clicks on desktop.
- Organ Sound: The synthesizer is configured to produce a rich, bluesy organ-like sound.
- Visual Feedback: Keys highlight when pressed, providing immediate visual confirmation.

# Sound Customization
The sound of the piano is generated using Tone.js and can be customized by editing the oscillator and envelope parameters in the JavaScript code:

- oscillator.type: Change this to experiment with different waveforms like "sine", "triangle", or "sawtooth" to alter the fundamental tone.
- envelope: Adjust the attack, decay, sustain, and release values to control how the note starts, holds, and fades out.
- Reverb: Modify the decay and wet parameters of the Tone.Reverb effect to change the spaciousness and resonance of the sound.
