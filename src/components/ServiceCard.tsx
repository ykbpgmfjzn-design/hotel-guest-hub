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
      className="group relative flex flex-col items-start gap-4 rounded-sm border border-border bg-card-gradient p-6 text-left transition-all duration-500 hover:border-gold/25 hover:shadow-gold animate-slide-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
    >
      {/* Gold accent line top */}
      <div className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />

      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-muted/50 transition-all duration-500 group-hover:border-gold/30 group-hover:bg-gold-muted/30">
        <Icon className="h-5 w-5 text-gold transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Text */}
      <div>
        <h3 className="font-display text-lg font-semibold tracking-wide text-foreground transition-colors group-hover:text-gold">
          {service.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>

      {/* Arrow */}
      <span className="absolute bottom-5 right-5 text-sm text-gold opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
        →
      </span>
    </button>
  );
}
