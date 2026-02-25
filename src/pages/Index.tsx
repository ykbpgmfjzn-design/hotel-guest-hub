import { useState } from "react";
import { WelcomeHero } from "@/components/WelcomeHero";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceDetail } from "@/components/ServiceDetail";
import { QuickActions } from "@/components/QuickActions";
import { HotelMap } from "@/components/HotelMap";
import { AmbientVideo } from "@/components/AmbientVideo";
import { ScrollIndicator } from "@/components/ScrollIndicator";
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
      {/* ===== FIRST SCREEN: everything important fits 1920x1080 ===== */}
      <div className="flex h-screen flex-col">
        {/* Hero — compact */}
        <WelcomeHero guest={mockGuest} />

        {/* Main content area */}
        <div className="flex flex-1 flex-col px-12 py-6 lg:px-20 xl:px-28">
          {/* Two-column layout: Quick Actions (left narrow) + Services (right wide) */}
          <div className="grid flex-1 gap-6 lg:grid-cols-12">
            {/* Left: Quick Actions */}
            <div className="lg:col-span-3 flex flex-col">
              <h2 className="mb-3 font-display text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase xl:text-base">
                Quick Actions
              </h2>
              <QuickActions />
            </div>

            {/* Right: Services grid */}
            <div className="lg:col-span-9 flex flex-col">
              <h2 className="mb-3 font-display text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase xl:text-base">
                Services
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {hotelServices.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onClick={setActiveService}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator at the very bottom */}
          <ScrollIndicator />
        </div>
      </div>

      {/* ===== BELOW THE FOLD ===== */}

      {/* Ambient Video */}
      <section className="px-12 py-10 lg:px-20 xl:px-28">
        <h2 className="mb-5 font-display text-xl font-semibold tracking-wide text-foreground xl:text-2xl">
          Atmosphere
        </h2>
        <AmbientVideo />
      </section>

      {/* Hotel Map */}
      <section className="px-12 py-10 lg:px-20 xl:px-28">
        <HotelMap />
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-12 py-8 lg:px-20 xl:px-28">
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
