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
    <div className="relative w-full overflow-hidden">
      {/* Background image — covers the entire viewport */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Hotel" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(30 10% 5% / 0.85) 0%, hsl(30 10% 5% / 0.6) 50%, hsl(30 10% 5% / 0.85) 100%)" }} />
      </div>

      <div className="relative z-10 flex flex-col px-12 py-8 lg:px-20 xl:px-28">
        {/* Top bar: logo + time */}
        <div className="flex items-center justify-between">
          <img src={magnumLogo} alt="Magnum Estate" className="h-12 w-auto opacity-90 xl:h-16" />
          <div className="text-right">
            <p className="font-display text-5xl font-light tracking-wider text-foreground xl:text-7xl">
              {time}
            </p>
            <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground uppercase xl:text-sm">
              {date}
            </p>
          </div>
        </div>

        {/* Guest greeting */}
        <div className="mt-6 animate-fade-in xl:mt-8">
          <div className="divider-gold mb-4 w-24" />
          <p className="mb-1 text-xs font-medium tracking-[0.4em] uppercase text-gold xl:text-sm">
            {guest.room} {guest.loyaltyTier && `· ${guest.loyaltyTier}`}
          </p>
          <h1 className="font-display text-3xl font-light tracking-wide text-foreground xl:text-5xl">
            Welcome, <span className="text-gradient-gold font-medium">{guest.name}</span>
          </h1>
          <p className="mt-2 text-sm tracking-wide text-muted-foreground xl:text-base">
            {new Date(guest.checkIn).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            {" — "}
            {new Date(guest.checkOut).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}
