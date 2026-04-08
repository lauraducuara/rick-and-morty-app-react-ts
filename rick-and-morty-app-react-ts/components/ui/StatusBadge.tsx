import { CharacterStatus } from "@/types/character";

const statusConfig: Record<
  CharacterStatus,
  { label: string; color: string }
> = {
  Alive: {
    label: "Vivo",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  Dead: {
    label: "Muerto",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  unknown: {
    label: "Desconocido",
    color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  },
};

interface StatusBadgeProps {
  status: CharacterStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5
        rounded-full text-xs font-medium border
        ${config.color}
      `}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}