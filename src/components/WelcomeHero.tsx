import { useClock } from "@/hooks/useClock";
import { GuestData } from "@/data/hotelData";
import heroImage from "@/assets/hotel-hero.jpg";
import magnumLogo from "@/assets/magnum-logo.png";

interface WelcomeHeroProps {
  guest: GuestData;
}

export function WelcomeHero({ guest }: WelcomeHeroProps) {
  const { time, date } = useClock();

  return (
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Hotel" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-8 lg:px-16">
        {/* Top bar: logo + time */}
        <div className="flex items-start justify-between">
          <img src={magnumLogo} alt="Magnum Estate" className="h-14 w-auto opacity-90 lg:h-16" />
          <div className="text-right">
            <p className="font-display text-5xl font-light tracking-wider text-foreground lg:text-6xl">
              {time}
            </p>
            <p className="mt-1 text-xs tracking-[0.25em] text-muted-foreground uppercase">
              {date}
            </p>
          </div>
        </div>

        {/* Bottom: greeting */}
        <div className="animate-fade-in">
          <div className="divider-gold mb-6 w-32" />
          <p className="mb-2 text-xs font-medium tracking-[0.35em] uppercase text-gold">
            {guest.room} {guest.loyaltyTier && `· ${guest.loyaltyTier}`}
          </p>
          <h1 className="font-display text-4xl font-light tracking-wide text-foreground lg:text-5xl">
            Welcome, <span className="text-gradient-gold font-medium">{guest.name}</span>
          </h1>
          <p className="mt-3 text-sm tracking-wide text-muted-foreground">
            {new Date(guest.checkIn).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            {" — "}
            {new Date(guest.checkOut).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
    </section>
  );
}
