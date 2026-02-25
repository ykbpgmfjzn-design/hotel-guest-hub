import { Phone, SprayCanIcon as Spray, Clock, BellOff } from "lucide-react";

const actions = [
  { icon: Phone, label: "Call Reception" },
  { icon: Spray, label: "Room Cleaning" },
  { icon: Clock, label: "Late Checkout" },
  { icon: BellOff, label: "Do Not Disturb" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <button
          key={action.label}
          data-tv-focusable
          className="group flex flex-col items-center gap-2 rounded-sm border border-border bg-card-gradient p-4 transition-all duration-500 hover:border-gold/20 hover:shadow-gold animate-slide-up xl:gap-3 xl:p-5 focus:outline-none"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
        >
          <action.icon className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110 xl:h-6 xl:w-6" />
          <span className="text-[11px] font-medium tracking-wider text-secondary-foreground uppercase xl:text-xs">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
