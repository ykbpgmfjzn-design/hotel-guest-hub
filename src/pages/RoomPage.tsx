import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Room } from "@/types/room";
import { WelcomeHero } from "@/components/WelcomeHero";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceDetail } from "@/components/ServiceDetail";
import { QuickActions } from "@/components/QuickActions";
import { HotelMap } from "@/components/HotelMap";
import { AmbientVideo } from "@/components/AmbientVideo";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useTvNavigation } from "@/hooks/useTvNavigation";
import { hotelServices, HotelService } from "@/data/hotelData";
import magnumLogo from "@/assets/magnum-logo.png";

export default function RoomPage() {
  const { roomNumber } = useParams<{ roomNumber: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState<HotelService | null>(null);

  useAutoScroll(30000, 1.2);
  useTvNavigation();

  // Fetch room data
  useEffect(() => {
    if (!roomNumber) return;

    const fetchRoom = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("room_number", roomNumber)
        .single();
      if (data) setRoom(data as Room);
      setLoading(false);
    };
    fetchRoom();

    // Realtime updates
    const channel = supabase
      .channel(`room-${roomNumber}`)
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "rooms",
        filter: `room_number=eq.${roomNumber}`,
      }, (payload) => {
        setRoom(payload.new as Room);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomNumber]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <img src={magnumLogo} alt="Magnum Estate" className="h-16 w-auto animate-pulse opacity-40" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
        <img src={magnumLogo} alt="Magnum Estate" className="h-16 w-auto opacity-40" />
        <p className="text-muted-foreground">Room not found</p>
      </div>
    );
  }

  const guest = {
    name: room.guest_name || "Guest",
    room: `Room ${room.room_number}`,
    checkIn: room.check_in || new Date().toISOString(),
    checkOut: room.check_out || new Date().toISOString(),
    loyaltyTier: room.loyalty_tier || undefined,
  };

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
      <div className="flex h-screen flex-col">
        <WelcomeHero guest={guest} />

        <div className="flex flex-1 flex-col px-12 py-4 lg:px-20 xl:px-28">
          <div className="mb-4">
            <h2 className="mb-3 font-display text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase xl:text-base">
              Quick Actions
            </h2>
            <QuickActions />
          </div>
          <div className="flex-1">
            <h2 className="mb-3 font-display text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase xl:text-base">
              Services
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:gap-5">
              {hotelServices.map((service, i) => (
                <ServiceCard key={service.id} service={service} onClick={setActiveService} index={i} />
              ))}
            </div>
          </div>
          <ScrollIndicator />
        </div>
      </div>

      <section className="px-12 py-10 lg:px-20 xl:px-28">
        <h2 className="mb-5 font-display text-xl font-semibold tracking-wide text-foreground xl:text-2xl">Atmosphere</h2>
        <AmbientVideo />
      </section>

      <section className="px-12 py-10 lg:px-20 xl:px-28">
        <HotelMap />
      </section>

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
}
