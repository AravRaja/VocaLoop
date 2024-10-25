# VocaLoop - Online DAW/Loopstation

**VocaLoop** is a new online DAW/loopstation platform, relying entirely on voice-to-MIDI conversion to mae instrument parts. It allows users to record vocal tracks and transforms them into instrument part that can then be heard back. This project utilizes Praat pitch detection and beat detection algorithms to analyze and convert vocal input into MIDI, making it possible for users to create full songs with multiple parts from their vocal recordings alone. This ends the need for user to have music skill on a instrument, instead all the user needs is an idea for a song and a voice!

## Key Features
- **Real-Time Voice-to-MIDI Conversion**: Converts vocal recordings into a MIDI file that can be played back with Tone.js 
- - Detects the onset and offsets of notes and then quantizes them down according to the bpm to obtain the ryhthmn of the part. 
- - Next takes these onset and offsets and uses a pitch detection algorithm to see the average pitch at the specified time removing outliers and zero values.

- **Online DAW Interface**: Provides a user-friendly, interactive DAW (Digital Audio Workstation) environment with playback controls, a playhead for visual tracking, and a customizable BPM slider as well as the ability to mute an unmute your audio parts in realtime which update the loop in Tones.js immediately.


## Tech Stack
- **Frontend**: React, Tone.js for audio handling
- **Backend**: Django REST framework
- **Audio Processing**: Praat (via Parselmouth) for pitch detection and Librosa for beat detection

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/VocaLoop.git
   cd VocaLoop# VocaLoop - Online DAW/Loopstation

2. **Backend Setup**:
   - Navigate to the backend directory and install dependencies:
     ```bash
     cd backend
     pip install -r requirements.txt
     ```
   - Run the Django development server:
     ```bash
     python manage.py runserver
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory and install dependencies:
     ```bash
     cd ../frontend
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

## Usage

1. **Recording and Voice-to-MIDI**: Record vocal tracks by setting a BPM and clicking "Record." VocaLoop will count in with a metronome and automatically convert your recordings to instrument parts.
2. **DAW Interface**: Use the DAW grid to loop and play back your tracks concurrently.


## File Structure
- **backend**: Django backend, API endpoints for audio upload and MIDI conversion
- -  **voice_to_midi**: Voice-to-MIDI conversion logic, including Praat pitch detection and beat detection algorithms
- **frontend**: React frontend, DAW interface, recording controls, and playback options


## Future Plans
- Extend DAW features for more instrument selection and looping options
- Clean up the GUI to make it a nicer user experience
- Enable live collaboration with other users singing at the same time
- Faster audio to Instrument conversion.
- Implement a module I'm developing that allows user to autogenerate music parts they don't want to sing.



## License
Project is licensed under the MIT License.