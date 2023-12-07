import Video from "./Video"; // Import the Video component

const RemoteParticipantVideos = ({
  isInitializeComplete, // Boolean indicating if the initialization is complete
  participants, // Array of participants
  participantSize, // Size of the participant
}) => {
  if (!isInitializeComplete) return; // If initialization is not complete, return

  return participants // Filter the participants that are not local and map each participant
    ?.filter(
      (participantAndStreamInfo) =>
        !participantAndStreamInfo.participant.isLocal // Filter out the local participants
    )
    .map((participantAndStreamInfo) => {
      const { participant, streams } = participantAndStreamInfo; // Destructure the participant and streams
      const { username } = participant?.attributes; // Destructure the username from the participant attributes
      let streamsToDisplay = streams; // Initialize streamsToDisplay with the remote streams

      return (
        <>
          {/* Heading for the remote participants */}
          <div className="flex margin">
            {" "}
            {/* Container for the remote participant videos */}
            <div className="video-container">
              {" "}
              {/* Video container for the remote participant */}
              {/* Render the Video component with necessary props */}
              <Video
                className="remote-participant-video" // CSS class for the remote participant video
                participant={participant} // Pass the participant information
                streamsToDisplay={streamsToDisplay} // Pass the streams to display
                username={username} // Pass the username
                participantSize={participantSize} // Pass the participant size
              />
            </div>
          </div>
        </>
      );
    });
};

export default RemoteParticipantVideos; // Export the RemoteParticipantVideos component
