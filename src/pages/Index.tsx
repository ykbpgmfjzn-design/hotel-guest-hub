import { useState } from "react";
import { WelcomeHero } from "@/components/WelcomeHero";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceDetail } from "@/components/ServiceDetail";
import { QuickActions } from "@/components/QuickActions";
import { HotelMap } from "@/components/HotelMap";
import { AmbientVideo } from "@/components/AmbientVideo";
import { mockGuest, hotelServices, HotelService } from "@/data/hotelData";
import magnumLogo from "@/assets/magnum-logo.png";

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
        <h2 className="mb-5 font-display text-xl font-semibold tracking-wide text-foreground">
          Services
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

      {/* Ambient Video */}
      <AmbientVideo />

      {/* Hotel Map */}
      <HotelMap />

      {/* Footer */}
      <footer className="border-t border-border px-8 py-8 lg:px-16">
        <div className="flex flex-col items-center gap-4">
          <img src={magnumLogo} alt="Magnum Estate" className="h-10 w-auto opacity-40" />
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            Dial <span className="text-gold">0</span> for Reception · 24/7
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
