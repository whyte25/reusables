import { RefreshCcwDot } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center group gap-2">
      <RefreshCcwDot
        size={17}
        className="transition-transform group-hover:rotate-180 duration-300"
      />
      <p>Reusables</p>
    </div>
  );
};
