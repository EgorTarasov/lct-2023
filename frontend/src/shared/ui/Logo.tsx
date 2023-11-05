import { ThemeService } from "@/stores/theme.service";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";

export const Logo = observer(({ width }: { width?: CSSProperties["width"] }) => (
  <img
    src={ThemeService.themeConfig?.logoUrl}
    alt={`Логотип компании: ${ThemeService.themeConfig?.companyName}`}
    className={"h-auto"}
    width={width ?? 200}
  />
));
