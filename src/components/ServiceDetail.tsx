import { ArrowLeft, Wine, Wind, UtensilsCrossed, Sparkles, Bell, Info, type LucideIcon } from "lucide-react";
import { HotelService } from "@/data/hotelData";
import magnumLogo from "@/assets/magnum-logo.png";

const iconMap: Record<string, LucideIcon> = {
  Wine, Wind, UtensilsCrossed, Sparkles, Bell, Info,
};

interface ServiceDetailProps {
  service: HotelService;
  onBack: () => void;
}

export function ServiceDetail({ service, onBack }: ServiceDetailProps) {
  const Icon = iconMap[service.icon] || Info;

  return (
    <div className="min-h-screen bg-background px-8 py-8 lg:px-16 animate-fade-in">
      {/* Top bar */}
      <div className="mb-10 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm tracking-wide text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <img src={magnumLogo} alt="Magnum Estate" className="h-8 w-auto opacity-60" />
      </div>

      {/* Header */}
      <div className="mb-10 flex items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-gold/20 bg-gold-muted/20">
          <Icon className="h-6 w-6 text-gold" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-wide text-foreground">
            {service.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
        </div>
      </div>

      <div className="divider-gold mb-8" />

      {/* Items */}
      <div className="grid gap-4 md:grid-cols-2">
        {service.items?.map((item, i) => (
          <div
            key={item.id}
            className="flex items-start justify-between rounded-sm border border-border bg-card-gradient p-5 transition-all duration-400 hover:border-gold/15 animate-slide-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex-1">
              <h3 className="font-display text-base font-semibold tracking-wide text-foreground">
                {item.name}
              </h3>
              <p className="mt-1 text-[13px] text-muted-foreground">{item.description}</p>
            </div>
            {item.price && (
              <span className="ml-4 whitespace-nowrap text-sm font-medium text-gold">
                {item.price}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10">
        <button className="rounded-sm bg-primary px-10 py-3 font-body text-sm font-medium tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:brightness-110 shadow-gold">
          Request / Order
        </button>
      </div>
    </div>
  );
}
