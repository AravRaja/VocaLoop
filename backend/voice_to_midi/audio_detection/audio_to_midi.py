from pitch_detection import detect_pitch, get_average_pitch
from beat_detection import detect_onsets, detect_offsets, generate_onset_offset
import numpy as np


def freq_to_note_mapping(frequency):
    A4_freq = 440  # Reference frequency for A4
    note_names = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
    
    if frequency <= 0 or np.isnan(frequency):
        return None, None  
    
    semitones_from_A4 = 12 * np.log2(frequency / A4_freq)
    nearest_semitone = int(np.round(semitones_from_A4))

    A4_index = note_names.index('A')  # Index of A4 in note_names array
    note_index = (A4_index + nearest_semitone) % 12  # Ensure note_index is between 0 and 11
    note = note_names[note_index]
    
    # Calculate the octave based on semitone distance from A4
    octave = 4 + ((A4_index + nearest_semitone) // 12)
    
    return note + str(octave)


def quantize_notes(onsets, offsets, bpm):
    
    seconds_per_beat = 60 / bpm
    threshold = 1.05
    
    quantized_onsets = np.zeros_like(onsets)
    quantized_offsets = np.zeros_like(offsets)

    for i, (onset, offset) in enumerate(zip(onsets, offsets)):
        
        note_length = offset - onset

    
        if note_length <= seconds_per_beat*threshold:
            
            quantization_strength = 4
        elif note_length <= 2 * seconds_per_beat*threshold:
           
            quantization_strength = 2
        else:
            
            quantization_strength = 1

        
        quantization_interval = seconds_per_beat / quantization_strength
        quantized_onsets[i] = np.round(onset / quantization_interval) * quantization_interval
        quantized_offsets[i] = np.round(offset / quantization_interval) * quantization_interval
        quantized_offsets[i] = max(quantized_onsets[i], quantized_offsets[i])

    return quantized_onsets, quantized_offsets

def on_file_upload(file):
    # Detect pitch
    time_values, pitch_values = detect_pitch(file)
    bpm = 120
    # Get the average pitch
    onset_times, offset_times = generate_onset_offset(file)
    quantize_onsets, quantize_offsets = quantize_notes(onset_times, offset_times, bpm)
    notes  = []
    for i in range(len(quantize_onsets)):
        
        notes.append(freq_to_note_mapping(get_average_pitch(time_values, pitch_values, quantize_onsets[i], quantize_offsets[i])))
    
    notes = [{"Note":note, "Onset": onset, "Offset": offset} for (note, onset, offset) in zip(notes, quantize_onsets, quantize_offsets)]
    return notes




if __name__ == "__main__":
    file = "/Users/aravraja/Documents/life/chat gpt tests/Internship added/test39.wav"
    for num,i in enumerate(on_file_upload(file)):
        pass
        print(f"Note {num+1}: {i}")
    