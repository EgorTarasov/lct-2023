import { useEffect, useState } from "react";
import NavIcon from "./assets/nav.svg";
import { NavLink } from "react-router-dom";
import { routesConfig } from "../../../../app";

export const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentRoute = routesConfig.find((route) => route.path === location.pathname);

  useEffect(() => {
    //DISABLE SCROLL
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
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
            className="w-10 h-10 text-white animate-fade-in animate-200ms"
          />
        </button>
        <h1 className="text-xl font-normal text-text-primary">{currentRoute?.title || ""}</h1>
      </div>
      {isMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-white">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
              <span className="sr-only">Закрыть меню</span>
              <NavIcon aria-hidden="true" focusable="false" className="w-10 h-10 text-primary" />
            </button>
          </div>
          <ul className="p-4">
            {routesConfig
              .filter((route) => route.isPrivate)
              .map((item) => (
                <li key={item.path} className="border-b border-text-primary">
                  <NavLink to={item.path} onClick={toggleMenu} className="block py-2">
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
