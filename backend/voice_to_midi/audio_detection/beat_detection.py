import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt

def get_amplitude_per_frame(y, onset_frames, frame_size=512):
    onset_amplitudes = []
    for onset_frame in onset_frames:

        # Calculate the start and end sample for the frame
        start_sample = onset_frame * frame_size
        end_sample = start_sample + frame_size
        
        # Make sure we dont ge behind the end
        if end_sample > len(y):
            end_sample = len(y)
        
        # get the sample for the coreresponding frame
        onset_samples = y[start_sample:end_sample]
        
        # Calculate the mean amplitude over the sample
        onset_amplitude = np.mean(np.abs(onset_samples))
        onset_amplitudes.append(onset_amplitude)
    return onset_amplitudes


def detect_onsets(y, sr, onset_threshold =0.2):


#compute the onset strength envelope
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)

#detects the onsets and returns the frame numbers
    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr,  delta = onset_threshold, pre_avg=20, post_avg=20)

    total_duration_frames = len(onset_env)

# make a threshold  to discard late onsets for last bit of recording
    threshold_frames = total_duration_frames * 0.95


    
    onset_amplitudes = get_amplitude_per_frame(y, onset_frames)
    onset_frames = [onset_frames[i] for i in range(len(onset_frames)) if onset_frames[i] < threshold_frames and onset_amplitudes[i] > 0.03]
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)
    
    return onset_frames, onset_times

def detect_offsets(y, sr, onset_frames, offset_threshold=0.2):
    

     #Get the RMS energy of the signal and the corresponding frame times
    rms = librosa.feature.rms(y=y)[0]
    frame_times = librosa.frames_to_time(np.arange(len(rms)), sr=sr)
    
    #Detecting the offset by looking for big eneergy drops after each onset
    offset_times = []

    for i, onset_frame in enumerate(onset_frames):
        #Immediately after the onset is detected, start searching for the offset
        onset_rms = rms[onset_frame]
        offset_detected = False
        
        # Search for an energy drop that signifies the note's end
        for j in range(onset_frame + 1, len(rms)):

            # If the next onset is detected before the offset set the offset just before the new onset
            if i + 1 < len(onset_frames) and j >= onset_frames[i + 1] - 1:
                offset_times.append(frame_times[onset_frames[i + 1] - 1])
                offset_detected = True
                break
            
            # ofset detection based on a energy drop below  a percent of the onset energy
            if rms[j] < onset_rms * offset_threshold:
                offset_times.append(frame_times[j])
                offset_detected = True
                break
        
        # set the last frame as an offset if theres still an open onset at the end of the file
        if not offset_detected:
            offset_times.append(frame_times[-1])
    

    return np.array(offset_times) 

def get_note_lengths( onset_times, offset_times):
    return np.array(offset_times) - np.array(onset_times)

def generate_onset_offset(audio_file):
    # Load the audio file
    y, sr = librosa.load(audio_file)
    duration = 0.1  
    padding = np.zeros(int(duration * sr))
    y = np.concatenate([padding, y])

    # Detect onsets
    onset_frames, onset_times = detect_onsets(y, sr,onset_threshold=0.15)

    # Detect offsets
    offset_times = detect_offsets(y, sr, onset_frames, offset_threshold=0.01)
    onset_times = onset_times - duration
    offset_times = offset_times - duration
    # Calculate note lengths
    note_lengths = get_note_lengths(onset_times, offset_times)
    # Create a list of dictionaries for each note

    return onset_times, offset_times