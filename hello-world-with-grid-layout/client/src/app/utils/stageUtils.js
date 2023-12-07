import { getMediaForDevices } from "./mediaDevices";

/**
 * Sets up the Strategy for 3 major actions a user performs: which streams to publish, should streams be published, subcribing to streams
 * @param {*} cameraStageStream The current user's camera MediaStream
 * @param {*} micStageStream The current user's microphone MediaStream
 * @returns strategy object
 */

const setupStrategy = (
  cameraStageStream, // Parameter representing the camera stage stream
  micStageStream, // Parameter representing the microphone stage stream
  isInitializeComplete // Parameter representing the initialization completion status
) => {
  // Check if the initialization is complete; if not, return nothing
  if (!isInitializeComplete) {
    return;
  }

  const { SubscribeType } = IVSBroadcastClient; // Reference the SubscribeType property from the IVSBroadcastClient object
  // More information can be found here: https://aws.github.io/amazon-ivs-web-broadcast/docs/v1.3.1/sdk-reference/enums/SubscribeType?_highlight=subscribetype

  // Define the strategy object
  const strategy = {
    // Method to determine the stage streams to publish
    stageStreamsToPublish() {
      return [cameraStageStream, micStageStream]; // Return an array containing cameraStageStream and micStageStream
    },
    // Method to determine whether to publish the participant
    shouldPublishParticipant() {
      return true; // Always return true
    },
    // Method to determine the type of subscription for participants
    shouldSubscribeToParticipant() {
      return SubscribeType.AUDIO_VIDEO; // Return the specific type of subscription
    },
  };
  return strategy; // Return the strategy object
};

/**
 * Click handler for Join Stage Button
 */

export const joinStage = async (
  isInitializeComplete, // Indicates if the initialization is complete
  selectedVideoDevice, // Represents the selected video device
  selectedAudioDevice, // Represents the selected audio device
  participantToken, // Token of the participant
  setIsMicMuted, // Setter for the microphone mute state
  setLocalParticipant, // Setter for the local participant
  setParticipants, // Setter for the list of participants
  setStage, // Setter for the stage
  setIsConnected // Setter for the connection status
) => {
  const {
    Stage, // Reference to the Stage class
    LocalStageStream, // Reference to the LocalStageStream class
    StageEvents, // Reference to the StageEvents object
    ConnectionState, // Reference to the ConnectionState object
  } = IVSBroadcastClient; // IVS Broadcast Client object

  if (!isInitializeComplete) return; // If the initialization is not complete, stop execution and return

  // Retrieve local camera and microphone
  const localCamera = await getMediaForDevices(selectedVideoDevice, "video");
  const localMic = await getMediaForDevices(selectedAudioDevice, "audio");

  // Create LocalStageStreams for the camera and microphone
  const cameraStageStream = new LocalStageStream(
    localCamera.getVideoTracks()[0]
  );
  const micStageStream = new LocalStageStream(localMic.getAudioTracks()[0]);

  // Set up the strategy for the stage
  const strategy = setupStrategy(
    cameraStageStream,
    micStageStream,
    isInitializeComplete
  );

  // Create a new stage instance
  let stage = new Stage(participantToken, strategy);

  // Event listener for stage connection state changes
  stage.on(StageEvents.STAGE_CONNECTION_STATE_CHANGED, (state) => {
    // Update the connection status
    setIsConnected(state === ConnectionState.CONNECTED);

    // Mute the microphone stage stream and update the state for the mic button
    micStageStream.setMuted(true);
    setIsMicMuted(true);
  });

  // Event listener for when participant streams are added
  stage.on(
    StageEvents.STAGE_PARTICIPANT_STREAMS_ADDED,
    (participant, streams) => {
      console.log("Participant Media Added: ", participant, streams);

      // Set the local participant and update the list of participants
      if (participant.isLocal) {
        setLocalParticipant({ participant, streams });
      }
      setParticipants((prevParticipants) => {
        return [...prevParticipants, { participant, streams }];
      });
    }
  );

  // Event listener for when a participant leaves
  stage.on(StageEvents.STAGE_PARTICIPANT_LEFT, (participant) => {
    console.log("Participant Left: ", participant);

    // Update the list of participants by removing the participant who left
    setParticipants((prevParticipants) => {
      const filteredParticipants = prevParticipants.filter(
        ({ participant: currentParticipant }) => {
          return currentParticipant.id !== participant.id;
        }
      );
      return [...filteredParticipants];
    });
  });

  try {
    await stage.join(); // Attempt to join the stage
  } catch (err) {
    stage = null;
  }

  setStage(stage); // Update the stage
};

/**
 * Click handler for the Leave Stage button
 */
export const leaveStage = async (stage, setIsConnected) => {
  await stage.leave();
  setIsConnected(false);
};
