import { useState } from "react";
import { MapPin } from "lucide-react";
import { mapLocations } from "@/data/hotelData";
import hotelMap from "@/assets/hotel-map.jpg";

export function HotelMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLocation = mapLocations.find((l) => l.id === selected);

  return (
    <section className="px-8 py-8 lg:px-16">
      <h2 className="mb-5 font-display text-xl font-semibold text-foreground">
        Hotel Map & Navigation
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map */}
        <div className="relative col-span-2 overflow-hidden rounded-lg border border-border">
          <img
            src={hotelMap}
            alt="Hotel floor plan"
            className="h-full w-full object-cover"
          />
          {/* Map pins */}
          {mapLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                selected === loc.id
                  ? "border-gold bg-gold scale-110"
                  : "border-gold/50 bg-background/80 hover:border-gold hover:scale-110"
              }`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              title={loc.name}
            >
              <MapPin
                className={`h-3.5 w-3.5 ${
                  selected === loc.id ? "text-primary-foreground" : "text-gold"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Location list */}
        <div className="flex flex-col gap-2">
          {mapLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all duration-200 ${
                selected === loc.id
                  ? "border-gold/40 bg-accent shadow-gold"
                  : "border-border bg-card-gradient hover:border-gold/20"
              }`}
            >
              <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${selected === loc.id ? "text-gold" : "text-muted-foreground"}`} />
              <div>
                <p className={`text-sm font-medium ${selected === loc.id ? "text-gold" : "text-foreground"}`}>
                  {loc.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {loc.floor} · {loc.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected detail */}
      {selectedLocation && (
        <div className="mt-4 rounded-lg border border-gold/20 bg-card-gradient p-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            <span className="font-display font-semibold text-foreground">
              {selectedLocation.name}
            </span>
            <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {selectedLocation.floor}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {selectedLocation.description}
          </p>
        </div>
      )}
    </section>
  );
}
