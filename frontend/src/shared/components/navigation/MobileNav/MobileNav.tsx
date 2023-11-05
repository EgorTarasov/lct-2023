import { useState } from "react";
import NavIcon from "./assets/nav.svg";
import { NavLink, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { routes } from "../../../../app/routes.ts";
import LightningIcon from "@/assets/lightning.svg";
import UserIcon from "@/assets/user.svg";
import ChevronIcon from "@/assets/chevron2.svg";
import { twMerge } from "tailwind-merge";
import CloseIcon from "@/assets/clear.svg";
import { ThemeService } from "@/stores/theme.service.ts";

export const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
  };

  return (
    <nav className="sticky block sm:hidden top-0 z-10 w-full bg-nav-background flex justify-between items-center px-4 py-2 shadow">
      <div className="flex items-center">
        <button
          id="nav-button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
          className="p-1">
          <span className="sr-only">{"Открыть меню"}</span>
          <NavIcon
            aria-hidden="true"
            focusable="false"
            className="w-10 h-10 text-nav-text animate-fade-in animate-200ms"
          />
        </button>
        <h1 className="text-xl font-normal text-nav-text">{currentRoute?.title || ""}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2" aria-label={"Ваша активность: 100%"}>
          <LightningIcon className="w-6 h-6 text-primary" />
          <span className="text-base text-text-primary">100</span>
        </div>
        <NavLink to={"/me"} aria-label="Перейти в профиль">
          <UserIcon className="w-10 h-10 text-primary" />
        </NavLink>
      </div>
      <Dialog open={isMenuOpen} onClose={toggleMenu} className="relative z-40">
        <Dialog.Panel>
          <Dialog.Title>Навигационное меню</Dialog.Title>
          <div id="mobile-menu" className="fixed inset-0 z-40 bg-nav-background">
            <div className="flex justify-between px-4 py-2 items-center">
              <div className="flex items-center">
                <button onClick={toggleMenu} className="p-1">
                  <span className="sr-only">Закрыть меню</span>
                  <CloseIcon
                    aria-hidden="true"
                    focusable="false"
                    className="w-10 h-10 text-text-primary"
                  />
                </button>
                <img src={ThemeService.themeConfig?.logoUrl} alt="Логотип" className="h-8" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2" aria-label={"Ваша активность: 100%"}>
                  <LightningIcon className="w-6 h-6 text-primary" />
                  <span className="text-base text-text-primary">100</span>
                </div>
                <NavLink to={"/me"} aria-label="Перейти в профиль">
                  <UserIcon className="w-10 h-10 text-primary" />
                </NavLink>
              </div>
            </div>
            <ul className="px-4">
              {routes
                .filter((route) => route.showInNav)
                .map((item) => (
                  <li
                    key={item.path}
                    className={twMerge(
                      "border-b border-nav-text py-3",
                      item.path === currentRoute?.path ? "text-primary" : ""
                    )}>
                    <NavLink
                      to={item.path}
                      onClick={toggleMenu}
                      className="flex items-center justify-between">
                      {item.title}
                      {item.path !== currentRoute?.path && <ChevronIcon className="w-6 h-6" />}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
};
