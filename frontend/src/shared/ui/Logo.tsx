import { ThemeService } from "@/stores/theme.service";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export const Logo = observer(
  ({ width, className }: { width?: CSSProperties["width"]; className?: string }) => (
    <div
      aria-label={`Логотип компании: ${ThemeService.themeConfig?.companyName}`}
      className={twMerge("h-auto", className)}
      style={{
        width: width ?? 200
      }}>
      <div dangerouslySetInnerHTML={{ __html: ThemeService.themeConfig?.logoSvg ?? "" }} />
    </div>
  )
);
