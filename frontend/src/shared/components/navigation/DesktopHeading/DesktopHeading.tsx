import { routes } from "../../../../app/routes.tsx";
import { NavLink } from "react-router-dom";
import ChevronIcon from "@/assets/chevron2.svg";
import { ThemeService } from "@/stores/theme.service.ts";
import LightningIcon from "@/assets/lightning.svg";
import UserIcon from "@/assets/user.svg";

export const DesktopLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  const currentRoute = routes.find((route) => route.path === location.pathname);
  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden bg-[#EDEDED]">
      <div
        className={"dark flex-shrink-0 overflow-x-hidden bg-white border border-text-primary/20"}>
        <div className={"h-full w-[260px]"}>
          <img src={ThemeService.themeConfig?.logoUrl} alt="Логотип" className="h-12" />
          {routes
            .filter((route) => route.showInNav)
            .map((item) => (
              <li
                key={item.path}
                className={
                  item.path === currentRoute?.path ? "text-primary" : "text-text-primary/80"
                }>
                <NavLink
                  to={item.path}
                  className="flex items-center justify-between border-b border-nav-text py-3">
                  {item.title}
                  {item.path !== currentRoute?.path && <ChevronIcon className="w-6 h-6" />}
                </NavLink>
              </li>
            ))}
        </div>
      </div>
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <DesktopHeading />
        <main className="relative h-full w-full overflow-auto">
          <div className={"max-w-[1024px] mx-auto flex-1 w-full"}>
            <div className={"flex h-full flex-col"}>
              <div className={"flex-1 h-full"}>
                <div className={"h-full w-full"}>{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const DesktopHeading = () => {
  return (
    <header className="sticky top-4 left-4 right-4 z-10">
      <div className="flex items-center justify-end gap-4 max-w-[1024px] mx-auto rounded-full bg-white w-full px-4 py-2">
        <NavLink to={"/shop"} aria-label="Перейти в магазин">
          <div className="flex items-center gap-2" aria-label={"Ваша баланс: 100"}>
            <LightningIcon className="w-6 h-6 text-primary" />
            <span className="text-base text-text-primary">100</span>
          </div>
        </NavLink>
        <NavLink to={"/me"} aria-label="Перейти в профиль">
          <UserIcon className="w-10 h-10 text-primary" />
        </NavLink>
      </div>
    </header>
  );
};
