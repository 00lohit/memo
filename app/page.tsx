//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { ModeToggle } from "@/components/custom/theme-provider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const useSpeech = () => {
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

  const stopListening = () => SpeechRecognition.stopListening();

  return {
    resetTranscript,
    listenContinuously,
    stopListening,
    message,
    transcript,
    listening,
  };
};

export default function Home() {
  const {
    resetTranscript,
    listenContinuously,
    stopListening,
    message,
    transcript,
    listening,
  } = useSpeech();

  return (
    <div>
      <div className="">
        <ModeToggle />
      </div>

      <div>
        <Label>listening: {listening ? "on" : "off"}</Label>
        <div>
          <Button onClick={resetTranscript}>Reset</Button>
          <Button onClick={listenContinuously}>Listen</Button>
          <Button onClick={stopListening}>Stop</Button>
        </div>
      </div>
      <div>{message}</div>
      <Textarea value={transcript} placeholder="Type your message here." />
    </div>
  );
}
