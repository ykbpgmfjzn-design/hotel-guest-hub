import { ArrowLeft, Wine, Wind, UtensilsCrossed, Sparkles, Bell, Info, type LucideIcon } from "lucide-react";
import { HotelService } from "@/data/hotelData";

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
      {/* Header */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Services
      </button>

      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-gold/30 bg-muted">
          <Icon className="h-6 w-6 text-gold" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            {service.title}
          </h1>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
      </div>

      {/* Items */}
      <div className="grid gap-4 md:grid-cols-2">
        {service.items?.map((item, i) => (
          <div
            key={item.id}
            className="flex items-start justify-between rounded-lg border border-border bg-card-gradient p-5 transition-all duration-300 hover:border-gold/20 animate-slide-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex-1">
              <h3 className="font-display text-base font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
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
      <div className="mt-8">
        <button className="rounded-lg bg-primary px-8 py-3 font-body text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 shadow-gold">
          Request / Order
        </button>
      </div>
    </div>
  );
}
