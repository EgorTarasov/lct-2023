import { useEffect, useState } from "react";
import NavIcon from "./assets/nav.svg";
import { NavLink } from "react-router-dom";
import { useEscape } from "@/hooks/useEscape";
import { routes } from "../../../../app/routes";
import { Dialog } from "@headlessui/react";

export const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentRoute = routes.find((route) => route.path === location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
  };

  return (
    <nav className="sticky block sm:hidden top-0 z-10 w-full bg-nav-background">
      <div className="flex items-center">
        <button
          id="nav-button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
          className="p-2">
          <span className="sr-only">{isMenuOpen ? "Закрыть меню" : "Открыть меню"}</span>
          <NavIcon
            aria-hidden="true"
            focusable="false"
            className="w-10 h-10 text-nav-text animate-fade-in animate-200ms"
          />
        </button>
        <h1 className="text-xl font-normal text-nav-text">{currentRoute?.title || ""}</h1>
      </div>
      <Dialog open={isMenuOpen} onClose={toggleMenu}>
        <Dialog.Panel>
          <Dialog.Title>Навигационное меню</Dialog.Title>
          <div id="mobile-menu" className="fixed inset-0 z-40 bg-nav-background">
            <div className="flex justify-end p-4">
              <button onClick={toggleMenu} className="p-2">
                <span className="sr-only">Закрыть меню</span>
                <NavIcon aria-hidden="true" focusable="false" className="w-10 h-10 text-primary" />
              </button>
            </div>
            <ul className="p-4">
              {routes
                .filter((p) => p.showInNav)
                .map((item) => (
                  <li key={item.path} className="border-b border-nav-text">
                    <NavLink to={item.path} onClick={toggleMenu} className="block py-2">
                      {item.title}
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
