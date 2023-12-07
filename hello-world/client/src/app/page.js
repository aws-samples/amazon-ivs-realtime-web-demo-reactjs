"use client";
// Importing the necessary dependencies for managing state and side effects in a React component
import { useState } from "react";
import Script from "next/script";

import { handleDeviceUpdate, handleMediaToggle } from "./utils/mediaDevices";
import { leaveStage, joinStage } from "./utils/stageUtils";

import Header from "./components/Header";
import Input from "./components/Input";
import LocalParticipantVideo from "./components/LocalParticipantVideo";
import RemoteParticipantVideos from "./components/RemoteParticipantVideos";
import Select from "./components/Select";

export default function Home() {
  // Initialize a state variable to manage the muted status of the microphone
  const [isMicMuted, setIsMicMuted] = useState(false);

  // Initialize a state variable to manage the visibility status of the camera
  const [isCameraHidden, setIsCameraHidden] = useState(false);

  // Initializing a state variable and its update function
  const [isInitializeComplete, setIsInitializeComplete] = useState(false);

  // Using the useState hook to create and manage state for video and audio devices and their selections
  const [videoDevices, setVideoDevices] = useState([]); // Stores the available video devices
  const [audioDevices, setAudioDevices] = useState([]); // Stores the available audio devices
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null); // Tracks the selected video device
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null); // Tracks the selected audio device

  // Initialize state for the participant token as an empty string
  const [participantToken, setParticipantToken] = useState("");

  // Initialize state variables for managing the current stage, connection status, participant list, and local participant information
  const [stage, setStage] = useState(null); // Manages the current stage
  const [isConnected, setIsConnected] = useState(false); // Tracks the connection status
  const [participants, setParticipants] = useState([]); // Manages the list of participants
  const [localParticipant, setLocalParticipant] = useState({}); // Manages the local participant information

  /**
   * Initialize after the client is loaded
   */
  const initialize = async () => {
    // Call the handleDeviceUpdate function to update the video and audio devices
    handleDeviceUpdate(
      setVideoDevices, // Function to set the video devices
      setAudioDevices, // Function to set the audio devices
      setSelectedVideoDevice, // Function to set the selected video device
      setSelectedAudioDevice // Function to set the selected audio device
    );
    // Set the value of isInitializeComplete to true
    setIsInitializeComplete(true);
  };

  return (
    <div>
      <Script
        src="https://web-broadcast.live-video.net/1.6.0/amazon-ivs-web-broadcast.js" // Load the Amazon IVS Web Broadcast JavaScript library
        onLoad={initialize} // Call the 'initialize' function after the script has loaded
      ></Script>
      <Header />
      <hr />
      <div className="row">
        <Select
          deviceType="Camera"
          updateDevice={setSelectedVideoDevice}
          devices={videoDevices}
        />
        <Select
          deviceType="Microphone"
          updateDevice={setSelectedAudioDevice}
          devices={audioDevices}
        />
        <Input
          label="Participant Token"
          value={participantToken}
          onChange={setParticipantToken}
        />
        {isInitializeComplete && (
          <div className="button-container row">
            <button
              className="button"
              onClick={() =>
                joinStage(
                  isInitializeComplete,
                  selectedVideoDevice,
                  selectedAudioDevice,
                  participantToken,
                  setIsMicMuted,
                  setLocalParticipant,
                  setParticipants,
                  setStage,
                  setIsConnected
                )
              }
            >
              Join Stage
            </button>
            <button
              className="button"
              onClick={() => leaveStage(stage, setIsConnected)}
            >
              Leave Stage
            </button>
          </div>
        )}
        <br />
      </div>
      {isConnected && ( <>
          <h3>Local Participant</h3>
          <LocalParticipantVideo
            localParticipantInfo={localParticipant}
            isInitializeComplete={isInitializeComplete}
            participantSize={participants.length}
          />
        </>
      )}
      {isConnected && (
        <div className="static-controls">
          <button
            onClick={() => handleMediaToggle("mic", stage, setIsMicMuted)}
            className="button"
          >
            {isMicMuted ? "Unmute Mic" : "Mute Mic"}
          </button>
          <button
            onClick={() =>
              handleMediaToggle("camera", stage, setIsCameraHidden)
            }
            className="button"
          >
            {isCameraHidden ? "Unhide Camera" : "Hide Camera"}
          </button>
        </div>
      )}
      {isConnected && (
        <>
          <h3>Remote Participants</h3>{" "}
          <div className="center">
            <RemoteParticipantVideos
              isInitializeComplete={isInitializeComplete}
              participants={participants}
              participantSize={participants.length}
            />
          </div>
        </>
      )}
    </div>
  );
}
