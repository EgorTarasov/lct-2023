import { ThemeService } from "@/stores/theme.service";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export const Logo = observer(
  ({ width, className }: { width?: CSSProperties["width"]; className?: string }) => (
    <img
      src={ThemeService.themeConfig?.logoUrl}
      alt={`Логотип компании: ${ThemeService.themeConfig?.companyName}`}
      className={twMerge("h-auto", className)}
      width={width ?? 200}
    />
  )
);
