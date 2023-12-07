/**
 * Returns all devices available on the current device
 */
export const getDevices = async () => {
  // Prevents issues on Safari/FF so devices are not blank
  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  const devices = await navigator.mediaDevices.enumerateDevices();

  // Get all video devices
  const videoDevices = devices.filter((d) => d.kind === "videoinput");
  if (!videoDevices.length) {
    console.error("No video devices found.");
  }

  // Get all audio devices
  const audioDevices = devices.filter((d) => d.kind === "audioinput");
  if (!audioDevices.length) {
    console.error("No audio devices found.");
  }

  return { videoDevices, audioDevices };
};

/**
 * Function gets the video and audio devices connected to the laptop and stores them in the state
 */
export const handleDeviceUpdate = async (
  updateVideoDevices,
  updateAudioDevices,
  updateLocalVideo,
  updateLocalAudio
) => {
  try {
    const { videoDevices, audioDevices } = await getDevices();
    updateVideoDevices(videoDevices);
    updateLocalVideo(videoDevices[0]?.deviceId);

    updateAudioDevices(audioDevices);
    updateLocalAudio(audioDevices[0]?.deviceId);
  } catch (error) {
    // Handle any errors that may occur during the device update process
    console.error("An error occurred during device update:", error);
    // You can add additional error-handling logic here as needed
  }
};

/**
 * Gets the media stream for the specified device ID and type.
 * @param {string} deviceId - The device ID.
 * @param {string} mediaType - The type of media ('video' or 'audio').
 * @returns {Promise<MediaStream>} - The resulting media stream.
 */
export const getMediaForDevices = async (deviceId, mediaType) => {
  const mediaConstraints = {
    video: {
      deviceId: mediaType === "video" && deviceId ? { exact: deviceId } : null,
    },
    audio: {
      deviceId: mediaType === "audio" && deviceId ? { exact: deviceId } : null,
    },
  };

  return navigator.mediaDevices.getUserMedia(mediaConstraints);
};

// Function to handle toggling of media, takes in deviceType, stage, and setIsHidden as parameters
export const handleMediaToggle = (deviceType, stage, setIsHidden) => {
  // Check if the type is 'camera', if so, toggle the video stream
  if (deviceType === "camera") {
    // Access the video stream of the local participant from the stage
    const { videoStream } = stage.localParticipant;
    // Get the current status of the video stream
    const isHidden = videoStream.isMuted;
    // Toggle the mute status of the video stream
    videoStream.setMuted(!isHidden);
    // Update the state to reflect the change in visibility
    setIsHidden(!isHidden);
  }
  // If the type is 'mic', toggle the audio stream
  else if (deviceType === "mic") {
    // Access the audio stream of the local participant from the stage
    const { audioStream } = stage.localParticipant;
    // Get the current status of the audio stream
    const isMuted = audioStream.isMuted;
    // Toggle the mute status of the audio stream
    audioStream.setMuted(!isMuted);
    // Update the state to reflect the change in muting
    setIsHidden(!isMuted);
  }
};
