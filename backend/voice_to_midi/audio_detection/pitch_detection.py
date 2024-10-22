import numpy as np
import parselmouth

def detect_pitch(audio_file, time_step=0.01, min_pitch=75, max_pitch=600, loudness_threshold=0.1):
    
    sound = parselmouth.Sound(audio_file)
    
    #runs a praat pitch detection algorithm
    pitch = sound.to_pitch(time_step=time_step, pitch_floor=min_pitch, pitch_ceiling=max_pitch)
    
    
    pitch_values = pitch.selected_array['frequency']  
    time_values = pitch.xs()  
    
    #get the intensity of the sound (rms energy)
    intensity = sound.to_intensity(time_step=time_step)
    intensity_values = intensity.values.T[0] 
    intensity_times = intensity.xs()  

    #interpolate the intensity values to match the pitch values
    if len(intensity_values) != len(intensity_times):
        min_len = min(len(intensity_values), len(intensity_times))
        intensity_values = intensity_values[:min_len]
        intensity_times = intensity_times[:min_len]
    interpolated_intensity = np.interp(time_values, intensity_times, intensity_values)
    
    # Apply the loudness threshold: Only keep pitch values where interpolated intensity is above the threshold
    pitch_values[interpolated_intensity < loudness_threshold] = np.nan  # Set pitch to NaN where intensity is too low
    
    return time_values, pitch_values
def get_average_pitch(time_values, pitch_values, start_time, end_time):

    if start_time >= end_time:
        raise ValueError("start_time must be less than end_time")
        

    start_index = np.searchsorted(time_values, start_time, side='left')
    end_index = np.searchsorted(time_values, end_time, side='right')
    period_pitch_values = pitch_values[start_index:end_index]
    period_pitch_values = period_pitch_values[~np.isnan(period_pitch_values)] 
    period_pitch_values = period_pitch_values[period_pitch_values != 0]
        
        
    if len(period_pitch_values) == 0:
        return np.nan 
        
    Q1 = np.percentile(period_pitch_values, 25)
    Q3 = np.percentile(period_pitch_values, 75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    filtered_pitch_values = period_pitch_values[(period_pitch_values >= lower_bound) & (period_pitch_values <= upper_bound)]
        
        
    if len(filtered_pitch_values) == 0:
        return np.nan 
    #print(filtered_pitch_values)
    average_pitch = np.mean(filtered_pitch_values)
        
    return average_pitch