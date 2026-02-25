import { useClock } from "@/hooks/useClock";
import { GuestData } from "@/data/hotelData";
import heroImage from "@/assets/hotel-hero.jpg";

interface WelcomeHeroProps {
  guest: GuestData;
}

export function WelcomeHero({ guest }: WelcomeHeroProps) {
  const { time, date } = useClock();

  return (
    <section className="relative h-[45vh] min-h-[360px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hotel lobby"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-8 lg:px-16">
        {/* Time */}
        <div className="absolute right-8 top-8 text-right lg:right-16">
          <p className="font-display text-5xl font-light tracking-wider text-foreground lg:text-6xl">
            {time}
          </p>
          <p className="mt-1 text-sm tracking-widest text-muted-foreground uppercase">
            {date}
          </p>
        </div>

        {/* Guest info */}
        <div className="animate-fade-in">
          <p className="mb-1 text-xs font-medium tracking-[0.3em] uppercase text-gold">
            {guest.room} {guest.loyaltyTier && `· ${guest.loyaltyTier} Member`}
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-wide text-foreground lg:text-5xl">
            Welcome, <span className="text-gradient-gold">{guest.name}</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Stay: {new Date(guest.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            {" — "}
            {new Date(guest.checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
    </section>
  );
}
