import Video from "./Video"; // Import the Video component

const RemoteParticipantVideos = ({
  isInitializeComplete, // Boolean indicating if the initialization is complete
  participants, // Array of participants
}) => {
  if (!isInitializeComplete) return; // If initialization is not complete, return

  return participants // Filter the participants that are not local and map each participant
    ?.filter(
      (participantAndStreamInfo) =>
        !participantAndStreamInfo.participant.isLocal // Filter out the local participants
    )
    .map((participantAndStreamInfo, index) => {
      const { participant, streams } = participantAndStreamInfo; // Destructure the participant and streams
      const { username } = participant?.attributes; // Destructure the username from the participant attributes
      let streamsToDisplay = streams; // Initialize streamsToDisplay with the remote streams

      return (
        <div className="flex margin" key={participant?.id}>
          {/* Container for the remote participant videos */}
          <div className="video-container" key={participant?.id}>
            {/* Video container for the remote participant */}
            {/* Render the Video component with necessary props */}
            <Video
              className="remote-participant-video" // CSS class for the remote participant video
              participant={participant} // Pass the participant information
              streamsToDisplay={streamsToDisplay} // Pass the streams to display
              username={username} // Pass the username
              participantSize={index+1} // Pass the participant size
              key={participant?.id}
            />
          </div>
        </div>
      );
    });
};

export default RemoteParticipantVideos; // Export the RemoteParticipantVideos component
