import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Room } from "@/types/room";
import { Search, LogOut, Users, DoorOpen, Save, X } from "lucide-react";
import magnumLogo from "@/assets/magnum-logo.png";

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ guest_name: "", check_in: "", check_out: "", loyalty_tier: "", is_occupied: false });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/staff");
    });
  }, [navigate]);

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .order("room_number");
      if (data) setRooms(data as Room[]);
      setLoading(false);
    };
    fetchRooms();

    // Realtime subscription
    const channel = supabase
      .channel("rooms-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, (payload) => {
        if (payload.eventType === "UPDATE") {
          setRooms((prev) =>
            prev.map((r) => (r.id === (payload.new as Room).id ? (payload.new as Room) : r))
          );
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/staff");
  };

  const startEdit = (room: Room) => {
    setEditingId(room.id);
    setEditData({
      guest_name: room.guest_name || "",
      check_in: room.check_in || "",
      check_out: room.check_out || "",
      loyalty_tier: room.loyalty_tier || "",
      is_occupied: room.is_occupied,
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await supabase
      .from("rooms")
      .update({
        guest_name: editData.guest_name,
        check_in: editData.check_in || null,
        check_out: editData.check_out || null,
        loyalty_tier: editData.loyalty_tier,
        is_occupied: editData.is_occupied,
      })
      .eq("id", editingId);
    setEditingId(null);
  };

  const quickCheckIn = async (room: Room) => {
    startEdit({ ...room, is_occupied: true });
  };

  const quickCheckOut = async (room: Room) => {
    await supabase
      .from("rooms")
      .update({ guest_name: "", check_in: null, check_out: null, loyalty_tier: "", is_occupied: false })
      .eq("id", room.id);
  };

  const filtered = useMemo(() => {
    if (!search) return rooms;
    const q = search.toLowerCase();
    return rooms.filter(
      (r) =>
        r.room_number.includes(q) ||
        (r.guest_name && r.guest_name.toLowerCase().includes(q))
    );
  }, [rooms, search]);

  const occupiedCount = rooms.filter((r) => r.is_occupied).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img src={magnumLogo} alt="Magnum Estate" className="h-8 w-auto opacity-80" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Dashboard
            </span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-gold">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Stats */}
        <div className="mb-6 flex gap-4">
          <div className="flex items-center gap-3 rounded-sm border border-border bg-card-gradient px-5 py-3">
            <DoorOpen className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xl font-semibold text-foreground">{rooms.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Total Rooms</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-border bg-card-gradient px-5 py-3">
            <Users className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xl font-semibold text-foreground">{occupiedCount}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Occupied</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by room or guest name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-sm border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/40 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-sm border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Room</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Guest Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Check-in</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Check-out</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Loyalty</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">TV Link</th>
                <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((room) => (
                <tr key={room.id} className="border-b border-border/50 transition-colors hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium text-foreground">{room.room_number}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block h-2 w-2 rounded-full ${room.is_occupied ? "bg-gold" : "bg-muted-foreground/30"}`} />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {room.is_occupied ? "Occupied" : "Vacant"}
                    </span>
                  </td>

                  {editingId === room.id ? (
                    <>
                      <td className="px-4 py-2">
                        <input value={editData.guest_name} onChange={(e) => setEditData({ ...editData, guest_name: e.target.value })}
                          placeholder="Guest name" className="w-full rounded-sm border border-border bg-background px-2 py-1 text-sm text-foreground focus:border-gold/40 focus:outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="date" value={editData.check_in} onChange={(e) => setEditData({ ...editData, check_in: e.target.value })}
                          className="rounded-sm border border-border bg-background px-2 py-1 text-sm text-foreground focus:border-gold/40 focus:outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="date" value={editData.check_out} onChange={(e) => setEditData({ ...editData, check_out: e.target.value })}
                          className="rounded-sm border border-border bg-background px-2 py-1 text-sm text-foreground focus:border-gold/40 focus:outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input value={editData.loyalty_tier} onChange={(e) => setEditData({ ...editData, loyalty_tier: e.target.value })}
                          placeholder="e.g. Platinum" className="w-full rounded-sm border border-border bg-background px-2 py-1 text-sm text-foreground focus:border-gold/40 focus:outline-none" />
                      </td>
                      <td className="px-4 py-3" />
                      <td className="px-4 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <label className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
                            <input type="checkbox" checked={editData.is_occupied}
                              onChange={(e) => setEditData({ ...editData, is_occupied: e.target.checked })}
                              className="accent-gold" />
                            Occupied
                          </label>
                          <button onClick={saveEdit} className="rounded-sm bg-primary p-1.5 text-primary-foreground hover:brightness-110">
                            <Save className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="rounded-sm border border-border p-1.5 text-muted-foreground hover:text-foreground">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-foreground">{room.guest_name || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{room.check_in || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{room.check_out || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{room.loyalty_tier || "—"}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`/room/${room.room_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gold underline decoration-gold/30 hover:decoration-gold"
                        >
                          /room/{room.room_number}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEdit(room)} className="text-xs text-muted-foreground transition-colors hover:text-gold">
                            Edit
                          </button>
                          {room.is_occupied ? (
                            <button onClick={() => quickCheckOut(room)} className="text-xs text-destructive transition-colors hover:brightness-110">
                              Check-out
                            </button>
                          ) : (
                            <button onClick={() => quickCheckIn(room)} className="text-xs text-gold transition-colors hover:brightness-110">
                              Check-in
                            </button>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
