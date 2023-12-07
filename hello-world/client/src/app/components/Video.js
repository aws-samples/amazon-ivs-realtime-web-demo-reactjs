const Video = ({
  className, // CSS class name for the video container
  participant, // Information about the participant
  streamsToDisplay, // Array of streams to be displayed
  username, // Username of the participant
  participantSize, // Size of the participant
}) => {
  return (
    // Container for the video with relative positioning
    <div className="relative">
      {/* Video element with key, muted attribute, and other necessary video properties */}
      <video
        key={participant?.id} // Unique key for the video element
        muted // Mute the video
        autoPlay // Enable autoplay for the video
        playsInline // Enable inline playback for the video
        className={className} // CSS class for the video element
        ref={(ref) => {
          // Function to set the video stream
          if (ref) {
            ref.srcObject = new MediaStream(); // Initialize a new MediaStream
            // Add tracks from the streamsToDisplay to the srcObject of the video
            streamsToDisplay?.forEach((stream) =>
              ref.srcObject.addTrack(stream.mediaStreamTrack)
            );
          }
        }}
      />
      {/* Overlay container for the username */}
      <div className="overlay-pill">
        {username ? username : `user-${participantSize}`}{" "}
        {/* Display the username if available, otherwise display a default username */}
      </div>
    </div>
  );
};

export default Video; // Export the Video component
