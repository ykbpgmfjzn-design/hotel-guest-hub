import { useState, useRef } from "react";
import { Volume2, VolumeX, Maximize2 } from "lucide-react";
import hotelVideo from "@/assets/hotel-ambient.mp4";

export function AmbientVideo() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <section className="px-8 py-8 lg:px-16">
      <h2 className="mb-5 font-display text-xl font-semibold text-foreground">
        Hotel Atmosphere
      </h2>
      <div className="relative overflow-hidden rounded-lg border border-border shadow-card">
        <video
          ref={videoRef}
          src={hotelVideo}
          autoPlay
          loop
          muted
          playsInline
          className="aspect-video w-full object-cover"
        />
        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-background/80 to-transparent px-4 pb-3 pt-8">
          <span className="text-xs text-muted-foreground font-medium tracking-wide">
            Live · Hotel Ambient
          </span>
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
