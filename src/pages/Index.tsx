import { useState } from "react";
import { WelcomeHero } from "@/components/WelcomeHero";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceDetail } from "@/components/ServiceDetail";
import { QuickActions } from "@/components/QuickActions";
import { HotelMap } from "@/components/HotelMap";
import { mockGuest, hotelServices, HotelService } from "@/data/hotelData";

const Index = () => {
  const [activeService, setActiveService] = useState<HotelService | null>(null);

  if (activeService) {
    return (
      <ServiceDetail
        service={activeService}
        onBack={() => setActiveService(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WelcomeHero guest={mockGuest} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Services */}
      <section className="px-8 py-8 lg:px-16">
        <h2 className="mb-5 font-display text-xl font-semibold text-foreground">
          Hotel Services
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotelServices.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={setActiveService}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Hotel Map */}
      <HotelMap />

      {/* Footer */}
      <footer className="border-t border-border px-8 py-6 text-center lg:px-16">
        <p className="text-xs text-muted-foreground">
          Need assistance? Dial <span className="text-gold font-medium">0</span> for Reception · Available 24/7
        </p>
      </footer>
    </div>
  );
};

export default Index;
