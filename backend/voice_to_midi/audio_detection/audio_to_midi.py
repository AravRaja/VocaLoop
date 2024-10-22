from pitch_detection import detect_pitch, get_average_pitch
from beat_detection import detect_onsets, detect_offsets, generate_note_sequence
import numpy as np
def freq_to_note_mapping(frequency):
    A4_freq = 440  # Reference frequency for A4
    note_names = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
    
    if frequency <= 0 or np.isnan(frequency):
        return None, None  # Handle silence or invalid frequency
    
    # Calculate semitones from A4
    semitones_from_A4 = 12 * np.log2(frequency / A4_freq)
    
    # Round to nearest semitone
    nearest_semitone = int(np.round(semitones_from_A4))
    
    # Determine the octave and note name
    A4_index = note_names.index('A')  # Index of A4 in note_names array
    note_index = (A4_index + nearest_semitone) % 12  # Ensure note_index is between 0 and 11
    note = note_names[note_index]
    
    # Calculate the octave based on semitone distance from A4
    octave = 4 + ((A4_index + nearest_semitone) // 12)
    
    return note + str(octave)

def on_file_upload(file):
    # Detect pitch
    time_values, pitch_values = detect_pitch(file)
    
    # Get the average pitch
    notes = generate_note_sequence(file)

    for num, i in enumerate(notes):
        
        i['note'] = freq_to_note_mapping(get_average_pitch(time_values, pitch_values, i['onset_time'], i['offset_time']))
    
    return notes


if __name__ == "__main__":
    file = "/Users/aravraja/Documents/life/chat gpt tests/Internship added/test39.wav"
    for num,i in enumerate(on_file_upload(file)):
        pass
        print(f"Note {num+1}: {i}")
    