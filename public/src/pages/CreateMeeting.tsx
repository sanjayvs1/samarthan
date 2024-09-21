import React, { useState, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const appId = 1044134370;
const serverSecret = "1ae8e04c89553561675c96cd5da2cc02";

const JoinMeeting: React.FC = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [meetingCode, setMeetingCode] = useState("");
  const validCode = "123456"; // Set your valid meeting code here

  // Function to handle joining the meeting
  const myMeeting = async (element: any) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      meetingCode, // Using the meeting code as the room ID
      "user-id", // You can replace with actual user ID logic
      "user-name" // Replace with actual user name logic
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Personal Link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  // Function to check if user-provided code is valid
  const handleJoin = () => {
    if (meetingCode === validCode) {
      setIsAllowed(true);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <div>
      {!isAllowed ? (
        <div>
          <h2>Enter Meeting Code</h2>
          <input
            type="text"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            placeholder="Enter code"
          />
          <button onClick={handleJoin}>Join Meeting</button>
        </div>
      ) : (
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{ width: "100%", height: "100vh" }}
        ></div>
      )}
    </div>
  );
};

export default JoinMeeting;
