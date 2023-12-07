import Video from "./Video"; // Import the Video component

const LocalParticipantVideo = ({
  isInitializeComplete, // Boolean indicating if the initialization is complete
  localParticipantInfo, // Information about the local participant
  participantSize, // Size of the participant
}) => {
  if (!isInitializeComplete) return; // If initialization is not complete, return

  const { participant, streams } = localParticipantInfo; // Destructure the participant and streams from localParticipantInfo
  const { username } = participant?.attributes; // Destructure the username from the participant attributes

  let streamsToDisplay = streams; // Initialize streamsToDisplay with the local streams

  const { StreamType } = IVSBroadcastClient; // Destructure StreamType from IVSBroadcastClient
  streamsToDisplay = streams.filter(
    (stream) => stream?.streamType === StreamType?.VIDEO // Filter the streams based on the streamType being video
  );

  return (
    // Container for the local participant's video
    <div className="video-container">
      <div className="column">
        {/* Render the Video component with necessary props */}
        <Video
          className="local-video" // CSS class for the local video
          participant={participant} // Pass the participant information
          streamsToDisplay={streamsToDisplay} // Pass the streams to display
          username={username} // Pass the username
          participantSize={participantSize} // Pass the participant size
        />
      </div>
    </div>
  );
};

export default LocalParticipantVideo; // Export the LocalParticipantVideo component
