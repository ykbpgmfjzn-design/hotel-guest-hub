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
      data-tv-focusable
      className="group relative flex items-center gap-5 rounded-sm border border-border bg-card-gradient p-5 text-left transition-all duration-500 hover:border-gold/25 hover:shadow-gold animate-slide-up focus:outline-none xl:gap-6 xl:p-7"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
    >
      <div className="absolute left-0 top-0 h-0 w-px bg-gradient-to-b from-gold to-transparent transition-all duration-500 group-hover:h-full" />
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/50 transition-all duration-500 group-hover:border-gold/30 group-hover:bg-gold-muted/30 xl:h-14 xl:w-14">
        <Icon className="h-5 w-5 text-gold transition-transform duration-500 group-hover:scale-110 xl:h-6 xl:w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-semibold tracking-wide text-foreground transition-colors group-hover:text-gold xl:text-xl">
          {service.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-1 xl:text-base">
          {service.description}
        </p>
      </div>
      <span className="shrink-0 text-base text-gold opacity-0 transition-all duration-500 group-hover:opacity-100 xl:text-lg">
        →
      </span>
    </button>
  );
}
