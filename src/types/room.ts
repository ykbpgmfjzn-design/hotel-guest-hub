// Room type matching the DB schema
export interface Room {
  id: string;
  room_number: string;
  guest_name: string;
  check_in: string | null;
  check_out: string | null;
  loyalty_tier: string;
  is_occupied: boolean;
  created_at: string;
  updated_at: string;
}
