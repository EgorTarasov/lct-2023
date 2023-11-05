import { ThemeService } from "@/stores/theme.service.ts";

export const Footer = () => {
  return (
    <footer className={"bottom-0 w-full border-t border-text-primary/20 bg-white mt-4"}>
      <div className={"flex flex-row justify-between items-center h-full py-2 px-4"}>
        {ThemeService.themeConfig?.logoUrl && (
          <img src={ThemeService.themeConfig.logoUrl} alt={"logo"} className={"h-8"} />
        )}
        <p className={"text-black text-sm"}>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
