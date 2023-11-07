import { ThemeService } from "@/stores/theme.service.ts";
import { Logo } from "@/ui";

export const Footer = () => {
  return (
    <footer
      className={
        "[grid-area:footer] block sm:hidden w-full border-t border-text-primary/20 bg-white h-fit mt-auto"
      }>
      <div className={"flex flex-row justify-between items-center h-full py-2 px-4"}>
        {ThemeService.themeConfig?.logoUrl && <Logo width={78} />}
        <p className={"text-black text-sm"}>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
