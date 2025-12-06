"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  id: string;
}

export default function VideoPlayer({ videoUrl, id }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        id={id}
        src={videoUrl}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* VIDEO CONTROLS */}
      <div className="absolute bottom-4 right-4 flex gap-2 bg-black/40 rounded p-1">
        <button
          className="text-white p-2 rounded bg-black/50 hover:bg-black/70 flex items-center justify-center"
          onClick={togglePlay}
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>

        <button
          className="text-white p-2 rounded bg-black/50 hover:bg-black/70 flex items-center justify-center"
          onClick={toggleMute}
        >
          {muted ? <VolumeX size={18} /> : <Volume size={18} />}
        </button>
      </div>
    </div>
  );
}
