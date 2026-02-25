import { Phone, SprayCanIcon as Spray, Clock, BellOff } from "lucide-react";

const actions = [
  { icon: Phone, label: "Call Reception" },
  { icon: Spray, label: "Room Cleaning" },
  { icon: Clock, label: "Late Checkout" },
  { icon: BellOff, label: "Do Not Disturb" },
];

export function QuickActions() {
  return (
    <section className="px-8 py-8 lg:px-16">
      <div className="divider-gold mb-8" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action, i) => (
          <button
            key={action.label}
            className="group flex flex-col items-center gap-3 rounded-sm border border-border bg-card-gradient p-5 transition-all duration-500 hover:border-gold/20 hover:shadow-gold animate-slide-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <action.icon className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xs font-medium tracking-wider text-secondary-foreground uppercase">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
