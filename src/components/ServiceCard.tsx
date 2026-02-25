import { Wine, Wind, UtensilsCrossed, Sparkles, Bell, Info, type LucideIcon } from "lucide-react";
import { HotelService } from "@/data/hotelData";

const iconMap: Record<string, LucideIcon> = {
  Wine, Wind, UtensilsCrossed, Sparkles, Bell, Info,
};

interface ServiceCardProps {
  service: HotelService;
  onClick: (service: HotelService) => void;
  index: number;
}

export function ServiceCard({ service, onClick, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Info;

  return (
    <button
      onClick={() => onClick(service)}
      className="group relative flex flex-col items-start gap-4 rounded-lg border border-border bg-card-gradient p-6 text-left transition-all duration-300 hover:border-gold/30 hover:shadow-gold animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-muted transition-colors duration-300 group-hover:border-gold/40 group-hover:bg-accent">
        <Icon className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
      </div>

      {/* Text */}
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
          {service.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>

      {/* Arrow hint */}
      <div className="absolute bottom-6 right-6 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
        →
      </div>
    </button>
  );
}
