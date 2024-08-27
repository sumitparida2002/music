import {
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Play,
  Pause,
} from "lucide-react";

interface PlaybackButtonsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  loop: boolean;
  setLoop: any;
}

function PlaybackButtons({
  isPlaying,
  onPlayPause,
  loop,
  setLoop,
}: PlaybackButtonsProps) {
  return (
    <div className="flex items-center justify-between mx-10">
      <Shuffle />
      <SkipBack height="40px" />
      <div
        className="w-fit rounded-full bg-black p-2 text-center cursor-pointer"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause /> : <Play />}
      </div>
      <SkipForward />
      <Repeat
        className={loop ? "text-green-400" : ""}
        onClick={() => {
          setLoop((loop: boolean) => !loop);
        }}
      />
    </div>
  );
}

export default PlaybackButtons;
