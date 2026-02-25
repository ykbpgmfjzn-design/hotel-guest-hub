import { useState } from "react";
import { MapPin } from "lucide-react";
import { mapLocations } from "@/data/hotelData";
import hotelMap from "@/assets/hotel-map.jpg";

export function HotelMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLocation = mapLocations.find((l) => l.id === selected);

  return (
    <div>
      <h2 className="mb-5 font-display text-xl font-semibold tracking-wide text-foreground xl:text-2xl">
        Property Map
      </h2>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="relative col-span-2 overflow-hidden rounded-sm border border-border">
          <img src={hotelMap} alt="Hotel floor plan" className="h-full w-full object-cover" />
          {mapLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={`absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ${
                selected === loc.id
                  ? "border-gold bg-gold scale-125"
                  : "border-gold/40 bg-background/70 hover:border-gold hover:scale-110"
              }`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              title={loc.name}
            >
              <MapPin className={`h-3 w-3 ${selected === loc.id ? "text-primary-foreground" : "text-gold"}`} />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {mapLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={`flex items-start gap-3 rounded-sm border p-3 text-left transition-all duration-300 ${
                selected === loc.id
                  ? "border-gold/30 bg-gold-muted/20 shadow-gold"
                  : "border-border bg-card-gradient hover:border-gold/15"
              }`}
            >
              <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${selected === loc.id ? "text-gold" : "text-muted-foreground"}`} />
              <div>
                <p className={`text-sm font-medium tracking-wide ${selected === loc.id ? "text-gold" : "text-foreground"}`}>
                  {loc.name}
                </p>
                <p className="text-xs text-muted-foreground">{loc.floor} · {loc.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-4 rounded-sm border border-gold/15 bg-card-gradient p-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            <span className="font-display font-semibold tracking-wide text-foreground">{selectedLocation.name}</span>
            <span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground">{selectedLocation.floor}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{selectedLocation.description}</p>
        </div>
      )}
    </div>
  );
}
