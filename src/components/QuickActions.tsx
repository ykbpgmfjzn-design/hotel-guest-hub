import { Phone, SprayCanIcon as Spray, Clock, BellOff, ExternalLink } from "lucide-react";

interface QuickAction {
  icon: typeof Phone;
  label: string;
  href?: string;
}

const actions: QuickAction[] = [
  { icon: Phone, label: "Call Reception" },
  { icon: Spray, label: "Room Cleaning" },
  { icon: Clock, label: "Late Checkout" },
  { icon: BellOff, label: "Do Not Disturb" },
];

const externalLinks: QuickAction[] = [
  { icon: ExternalLink, label: "Lounge Menu", href: "https://umalaslounge.com" },
  { icon: ExternalLink, label: "Shisha Menu", href: "https://shisha.cool" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {actions.map((action, i) => (
        <button
          key={action.label}
          data-tv-focusable
          className="group flex flex-col items-center gap-3 rounded-sm border border-border bg-card-gradient p-5 transition-all duration-500 hover:border-gold/20 hover:shadow-gold animate-slide-up focus:outline-none xl:gap-4 xl:p-7"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
        >
          <action.icon className="h-7 w-7 text-gold transition-transform duration-300 group-hover:scale-110 xl:h-9 xl:w-9" />
          <span className="text-xs font-medium tracking-wider text-secondary-foreground uppercase xl:text-sm">
            {action.label}
          </span>
        </button>
      ))}
      {externalLinks.map((link, i) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          data-tv-focusable
          className="group flex flex-col items-center gap-3 rounded-sm border border-gold/20 bg-gold-subtle p-5 transition-all duration-500 hover:border-gold/40 hover:shadow-gold animate-slide-up focus:outline-none xl:gap-4 xl:p-7"
          style={{ animationDelay: `${(actions.length + i) * 80}ms`, animationFillMode: "backwards" }}
        >
          <link.icon className="h-7 w-7 text-gold transition-transform duration-300 group-hover:scale-110 xl:h-9 xl:w-9" />
          <span className="text-xs font-medium tracking-wider text-gold uppercase xl:text-sm">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
}
