import { Phone, SprayCanIcon as Spray, Clock, BellOff } from "lucide-react";

const actions = [
  { icon: Phone, label: "Call Reception", color: "text-gold" },
  { icon: Spray, label: "Room Cleaning", color: "text-gold" },
  { icon: Clock, label: "Late Checkout", color: "text-gold" },
  { icon: BellOff, label: "Do Not Disturb", color: "text-gold" },
];

export function QuickActions() {
  return (
    <section className="px-8 py-8 lg:px-16">
      <h2 className="mb-5 font-display text-xl font-semibold text-foreground">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action, i) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card-gradient p-4 transition-all duration-300 hover:border-gold/30 hover:shadow-gold animate-slide-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
          >
            <action.icon className={`h-5 w-5 ${action.color}`} />
            <span className="text-xs font-medium text-secondary-foreground">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
