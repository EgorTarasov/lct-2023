import { twMerge } from "tailwind-merge";

interface IChip {
  title: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  icon?: JSX.Element;
}

export const Chip: React.FC<IChip> = ({ title, onClick, className, isActive, icon }) => {
  return (
    <button
      onClick={onClick}
      aria-label={`Фильтр по ${title}`}
      aria-pressed={isActive}
      className={twMerge(
        "flex items-center gap-2 px-3 py-1 rounded-lg transition-colors border border-primary",
        isActive ? "bg-primary text-white" : "bg-primary/5 text-primary",
        className
      )}>
      {icon}
      <span>{title}</span>
    </button>
  );
};
