export const CAMERA = "camera";
export const MIC = "mic";

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
 * Gets the media stream for the specified device ID and type.
 * @param {string} deviceId - The device ID.
 * @param {string} mediaType - The type of media ('video' or 'audio').
 * @returns {Promise<MediaStream>} - The resulting media stream.
 */
export const getMediaForDevices = async (deviceId, mediaType) => {
  const mediaConstraints = {
    video: {
      deviceId: mediaType === CAMERA && deviceId ? { exact: deviceId } : null,
    },
    audio: {
      deviceId: mediaType === MIC && deviceId ? { exact: deviceId } : null,
    },
  };

  return navigator.mediaDevices.getUserMedia(mediaConstraints);
};

// Function toggles the mute status of the specified device type (CAMERA or MIC) for the local participant in a given stage.
// Uses stageRef to access the current participant's stream and updates the state (setIsDeviceStopped) accordingly.
export const handleMediaToggle = (deviceType, stageRef, setIsDeviceStopped) => {
  // Check if the type is 'camera'; if so, toggle the video stream
  if (deviceType === CAMERA) {
    // Access the video stream of the local participant from the stage
    const { videoStream } = stageRef.current.localParticipant;

    // Get the current status of the video stream
    const isHidden = videoStream.isMuted;

    // Toggle the mute status of the video stream
    videoStream.setMuted(!isHidden);

    // Update the state to reflect the change in visibility
    setIsDeviceStopped(!isHidden);
  }
  // If the type is 'mic', toggle the audio stream
  else if (deviceType === MIC) {
    // Access the audio stream of the local participant from the stage
    const { audioStream } = stageRef.current.localParticipant;

    // Get the current status of the audio stream
    const isMuted = audioStream.isMuted;

    // Toggle the mute status of the audio stream
    audioStream.setMuted(!isMuted);

    // Update the state to reflect the change in muting
    setIsDeviceStopped(!isMuted);
  }
};
