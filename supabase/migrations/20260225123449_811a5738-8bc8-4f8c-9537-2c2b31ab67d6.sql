
-- Table for rooms with guest info (207 rooms)
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_number TEXT NOT NULL UNIQUE,
  guest_name TEXT DEFAULT '',
  check_in DATE,
  check_out DATE,
  loyalty_tier TEXT DEFAULT '',
  is_occupied BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Public read: guest pages need to read room data without auth
CREATE POLICY "Anyone can read rooms"
  ON public.rooms FOR SELECT
  USING (true);

-- Only authenticated staff can modify rooms
CREATE POLICY "Staff can update rooms"
  ON public.rooms FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Staff can insert rooms"
  ON public.rooms FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for rooms
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;

-- Seed 207 rooms
INSERT INTO public.rooms (room_number)
SELECT 
  CASE 
    WHEN n <= 50 THEN '1' || LPAD(n::text, 2, '0')
    WHEN n <= 100 THEN '2' || LPAD((n - 50)::text, 2, '0')
    WHEN n <= 150 THEN '3' || LPAD((n - 100)::text, 2, '0')
    WHEN n <= 200 THEN '4' || LPAD((n - 150)::text, 2, '0')
    ELSE '5' || LPAD((n - 200)::text, 2, '0')
  END
FROM generate_series(1, 207) AS n;
