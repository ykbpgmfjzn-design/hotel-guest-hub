import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 py-4 animate-fade-in">
      <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase xl:text-xs">
        Scroll for more
      </span>
      <ChevronDown className="h-4 w-4 text-gold animate-bounce" />
    </div>
  );
}
