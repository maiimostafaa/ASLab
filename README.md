# ASLab - ASL Learning Platform

An interactive American Sign Language (ASL) learning platform that uses computer vision and real-time hand tracking to help users learn ASL signs.

## Features

- **Real-time Hand Tracking**: Uses MediaPipe Hands for accurate hand landmark detection
- **Two-Handed Sign Support**: Tracks both hands simultaneously for two-handed signs
- **Motion-Based Recognition**: Analyzes hand movements and motion patterns, not just static poses
- **Orientation-Flexible Detection**: Recognizes handshapes at various angles and orientations
- **Interactive Learning**: Provides real-time feedback to help users improve their signing
- **Hardware Integration**: Optional Web Serial API support for custom microcontroller inputs
- **5 Handshapes**: Currently supports 1, 5, A, B, and S handshapes with multiple sign variations

## Quick Start

1. **Open the Application**
   - Open `file:///Users/maimostafa/Documents/GitHub/ASLab/index.html` in a modern web browser (Chrome, Edge, or Safari recommended)
   - No server or build process required!

2. **Start Learning**
   - Click a handshape button (1, A, B, S, or 5)
   - Watch the reference video in the top-right quadrant
   - Click "Start Camera" to enable your webcam
   - Copy the sign shown in the video
   - Receive real-time feedback on your signing

## Interface Layout

The application uses a 4-quadrant split-screen layout:

- **Top Left**: Sign information (name, definition, description, handshape)
- **Top Right**: Reference video of the instructor demonstrating the sign
- **Bottom Left**: Handshape selection buttons (1, A, B, S, 5)
- **Bottom Right**: Your webcam feed with MediaPipe hand tracking overlay
- **Bottom Bar**: Real-time feedback from the computer vision system

## How It Works

1. **Select a Sign**: Click one of the handshape buttons or press the corresponding key (1, 5, A, S, or B)
2. **Watch & Learn**: The app randomly selects a sign with that handshape and displays the reference video
3. **Practice**: Position your hands in view of the camera and copy the sign
4. **Get Feedback**: The system analyzes your handshape and motion, providing guidance
5. **Complete**: When you successfully match the sign with proper motion for 5 seconds, you'll see a success message!

## Motion-Based Recognition

Unlike traditional static pose detection, ASLab requires:
- **Correct handshape** maintained throughout the sign
- **Sustained movement** appropriate to the sign type
- **Continuous performance** for several seconds

This ensures users are actually performing signs with proper motion, not just holding static poses.

## Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Computer Vision**: MediaPipe Hands (CDN version)
- **Hardware Integration**: Web Serial API (optional)
- **Hosting**: GitHub Pages compatible (no backend required)

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Safari (macOS/iOS) (note that Safari does not support the optional hardware integration as it does not support the Web Serial API)
- ⚠️ Firefox (MediaPipe support varies)

## File Structure

```
ASLab/
├── index.html          # Main application page
├── styles.css          # Application styling
├── app.js              # Main JavaScript logic
├── assets/
│   ├── handshapes/     # SVG handshape icons
│   ├── logos/          # ASLab logos
│   └── videos/         # Sign demonstration videos
│       ├── 1/          # Handshape "1" signs
│       ├── 5/          # Handshape "5" signs
│       ├── A/          # Handshape "A" signs
│       ├── B/          # Handshape "B" signs
│       └── S/          # Handshape "S" signs
└── README.md           # This file
```

## Keyboard Shortcuts

- `1` - Load a random sign with handshape "1"
- `5` - Load a random sign with handshape "5"
- `A` - Load a random sign with handshape "A"
- `B` - Load a random sign with handshape "B"
- `S` - Load a random sign with handshape "S"

## Adding New Signs

To add new signs to the database:

1. Add your video file to the appropriate handshape folder in `assets/videos/`
2. Update the `videoDatabase` object in `app.js` with the new sign's information:

```javascript
'handshape': [
    { 
        video: 'assets/videos/handshape/filename.mov', 
        name: 'Sign Name', 
        definition: 'Definition text',
        description: 'Description of how to do the sign' 
    },
    // ... more signs
]
```

## License

MIT License - See LICENSE file for details

## Credits

Developed with ❤️ for ASL learners everywhere
