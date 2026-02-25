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
      <h2 className="mb-5 font-display text-xl font-semibold tracking-wide text-foreground">
        Atmosphere
      </h2>
      <div className="relative overflow-hidden rounded-sm border border-border shadow-card">
        <video
          ref={videoRef}
          src={hotelVideo}
          autoPlay
          loop
          muted
          playsInline
          className="aspect-video w-full object-cover"
        />
        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 pb-4 pt-10" style={{ background: "linear-gradient(to top, hsl(30 10% 5% / 0.8), transparent)" }}>
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Magnum Estate · Live
          </span>
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:border-gold/30 hover:text-gold"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
