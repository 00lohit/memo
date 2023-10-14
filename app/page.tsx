//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Home() {
  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "clear",
      callback: () => resetTranscript(),
    },
    {
      command: "go to next line",
      callback: () => setMessage("!!!!!!!!!!"),
    },
  ];
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };
  return (
    <div>
      <div>
        <span>listening: {listening ? "on" : "off"}</span>
        <div>
          <button type="button" onClick={resetTranscript}>
            Reset
          </button>
          <button type="button" onClick={listenContinuously}>
            Listen
          </button>
          <button type="button" onClick={SpeechRecognition.stopListening}>
            Stop
          </button>
        </div>
      </div>
      <div>{message}</div>
      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
}
