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
import { Mic, MicOff } from "lucide-react";

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
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   console.log(
  //     "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
  //   );
  // }
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
    <div className="p-4">
      <div className="fixed right-4 top-4">
        <ModeToggle />
      </div>

      <div className="mb-4">
        <Button variant="outline" onClick={resetTranscript}>
          Reset
        </Button>
        <Button
          className="ml-4"
          variant="outline"
          onClick={listening ? stopListening : listenContinuously}
        >
          {listening ? "Stop" : "Listen"}
          <div className="ml-2">
            {listening ? (
              <MicOff className="h-[1rem] w-[1.2rem] transition-all " />
            ) : (
              <Mic className="h-[1rem] w-[1.2rem] transition-all" />
            )}
          </div>
        </Button>
      </div>

      <div>{message}</div>
      <Textarea
        value={transcript}
        placeholder={
          listening
            ? "Start speaking..."
            : 'Click on "Listen" and start speaking'
        }
      />
    </div>
  );
}
