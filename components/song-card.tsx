"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import cover from "@/public/Graduation_(album).jpg";
import Image from "next/image";
import PlaybackButtons from "./playback-buttons";
import { Slider } from "@/components/ui/slider";
import { useRef, useState } from "react";

export function SongCard() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [loop, setLoop] = useState(false);

  const togglePlayPause = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number[]): void => {
    if (audioRef.current && value[0] !== undefined) {
      audioRef.current.currentTime =
        (value[0] / 100) * audioRef.current.duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = (): void => {
    setIsPlaying(false);
  };

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader className="mx-auto">
        <Image src={cover} width={300} alt="img" className="rounded-md" />
      </CardHeader>
      <CardContent>
        <h1 className="text-xl">Graduation</h1>
        <p className="text-muted-foreground text-sm">Kanye West</p>
        <Slider
          value={[(currentTime / (audioRef.current?.duration || 1)) * 100 || 0]}
          max={100}
          step={1}
          onValueChange={handleSliderChange}
          className="my-4 hover:cursor-pointer"
        />
        <PlaybackButtons
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          loop={loop}
          setLoop={setLoop}
        />
        <audio
          ref={audioRef}
          src="/good.mp3"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
          loop={loop}
        />
      </CardContent>
    </Card>
  );
}
