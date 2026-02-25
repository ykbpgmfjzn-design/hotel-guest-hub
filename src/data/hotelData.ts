export interface GuestData {
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  loyaltyTier?: string;
  preferences?: string[];
}

export interface HotelService {
  id: string;
  title: string;
  titleRu?: string;
  description: string;
  icon: string;
  category: 'dining' | 'wellness' | 'entertainment' | 'services';
  items?: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  image?: string;
}

export interface MapLocation {
  id: string;
  name: string;
  floor: string;
  description: string;
  x: number;
  y: number;
}

// Mock data
export const mockGuest: GuestData = {
  name: "Mr. Aleksandr",
  room: "Suite 412",
  checkIn: "2026-02-24",
  checkOut: "2026-03-02",
  loyaltyTier: "Platinum",
  preferences: ["Late checkout", "Extra pillows", "No nuts"],
};

export const hotelServices: HotelService[] = [
  {
    id: "lounge",
    title: "Mala's Lounge",
    description: "Premium cocktails & fine dining in an intimate atmosphere",
    icon: "Wine",
    category: "dining",
    items: [
      { id: "l1", name: "Signature Cocktails", description: "Handcrafted by our mixologists", price: "From $18" },
      { id: "l2", name: "Tasting Menu", description: "7-course culinary journey", price: "$185" },
      { id: "l3", name: "Wine Collection", description: "Over 200 curated labels", price: "From $12" },
      { id: "l4", name: "Bar Bites", description: "Artisan small plates", price: "From $14" },
    ],
  },
  {
    id: "shisha",
    title: "Shisha Terrace",
    description: "Premium shisha blends on a panoramic rooftop terrace",
    icon: "Wind",
    category: "entertainment",
    items: [
      { id: "s1", name: "Classic Blends", description: "Traditional flavors", price: "From $35" },
      { id: "s2", name: "Premium Collection", description: "Exclusive house blends", price: "From $55" },
      { id: "s3", name: "Fruit Mixes", description: "Fresh fruit infusions", price: "From $45" },
    ],
  },
  {
    id: "room-service",
    title: "Room Service",
    description: "24/7 in-room dining with our full kitchen menu",
    icon: "UtensilsCrossed",
    category: "dining",
    items: [
      { id: "r1", name: "Breakfast", description: "Continental & à la carte", price: "From $22" },
      { id: "r2", name: "Lunch & Dinner", description: "Full restaurant menu", price: "From $30" },
      { id: "r3", name: "Late Night", description: "Comfort classics 11PM–6AM", price: "From $18" },
    ],
  },
  {
    id: "spa",
    title: "Spa & Wellness",
    description: "Rejuvenating treatments and thermal experiences",
    icon: "Sparkles",
    category: "wellness",
    items: [
      { id: "sp1", name: "Signature Massage", description: "90 min full body", price: "$180" },
      { id: "sp2", name: "Facial Treatment", description: "Luxury skincare ritual", price: "$150" },
      { id: "sp3", name: "Hammam Experience", description: "Traditional steam & scrub", price: "$120" },
      { id: "sp4", name: "Pool & Sauna", description: "Complimentary for guests", price: "Free" },
    ],
  },
  {
    id: "concierge",
    title: "Concierge",
    description: "Transfers, excursions, and personalized experiences",
    icon: "Bell",
    category: "services",
    items: [
      { id: "c1", name: "Airport Transfer", description: "Private luxury vehicle", price: "From $85" },
      { id: "c2", name: "City Tours", description: "Guided excursions", price: "From $60" },
      { id: "c3", name: "Special Requests", description: "We make it happen", price: "Varies" },
    ],
  },
  {
    id: "info",
    title: "Hotel Info",
    description: "Wi-Fi, contacts, and everything you need",
    icon: "Info",
    category: "services",
    items: [
      { id: "i1", name: "Wi-Fi Password", description: "Network: Hotel_Guest / Pass: Welcome2026", price: "" },
      { id: "i2", name: "Reception", description: "Available 24/7 — Dial 0", price: "" },
      { id: "i3", name: "Emergency", description: "Dial 112 or contact reception", price: "" },
    ],
  },
];

export const mapLocations: MapLocation[] = [
  { id: "lobby", name: "Lobby & Reception", floor: "Ground", description: "Main entrance and front desk", x: 50, y: 80 },
  { id: "lounge", name: "Mala's Lounge", floor: "Ground", description: "Bar & restaurant", x: 75, y: 60 },
  { id: "pool", name: "Pool & Terrace", floor: "Ground", description: "Outdoor infinity pool", x: 30, y: 30 },
  { id: "spa", name: "Spa & Wellness", floor: "Level -1", description: "Treatments & hammam", x: 60, y: 40 },
  { id: "shisha", name: "Shisha Terrace", floor: "Rooftop", description: "Panoramic rooftop lounge", x: 45, y: 15 },
  { id: "gym", name: "Fitness Center", floor: "Level -1", description: "24/7 equipped gym", x: 20, y: 55 },
  { id: "garden", name: "Garden", floor: "Ground", description: "Zen garden & walking paths", x: 15, y: 35 },
  { id: "parking", name: "Parking", floor: "Level -2", description: "Valet & self-parking", x: 85, y: 85 },
];
