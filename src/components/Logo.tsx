import { Icon } from "./Icon";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "onLight" | "onDark";
  withText?: boolean;
}

// The CampusFlow brand mark. `onDark` for navy backgrounds, `onLight` elsewhere.
export function Logo({
  size = "md",
  variant = "onLight",
  withText = true,
}: LogoProps) {
  const onDark = variant === "onDark";
  const box =
    size === "lg"
      ? "h-16 w-16 rounded-2xl"
      : size === "sm"
        ? "h-8 w-8 rounded-lg"
        : "h-10 w-10 rounded-xl";
  const iconSize =
    size === "lg" ? "h-9 w-9" : size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const textSize =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  const boxColor = onDark ? "bg-white/10 text-white" : "bg-navy text-white";
  const textColor = onDark ? "text-white" : "text-slate-900";

  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center ${box} ${boxColor}`}>
        <Icon name="building" className={iconSize} />
      </div>
      {withText && (
        <span className={`font-bold tracking-tight ${textSize} ${textColor}`}>
          Mydorm
        </span>
      )}
    </div>
  );
}
