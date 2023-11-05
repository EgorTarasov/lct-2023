import { HTMLProps } from "react";

export const IconButton = ({ children: Icon }: { children: React.FC<HTMLProps<SVGElement>> }) => {
  return (
    <button className="p-2">
      <Icon />
    </button>
  );
};
