import { useEffect, useState } from "react";
import NavIcon from "./assets/nav.svg";
import { useNavigate } from "react-router-dom";

const Nav = [
  { url: "/", text: "Главная" },
  { url: "/tasks", text: "Задания" },
  { url: "/events", text: "События" },
  { url: "/me", text: "Профиль" },
  { url: "/shop", text: "Магазин" },
  { url: "/contacts", text: "Контакты" }
];

export const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
        <h1 className="text-xl font-normal text-text-primary">Главная</h1>
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
            {Nav.map((item) => (
              <li key={item.url} className="border-b border-text-primary">
                <a
                  href={item.url}
                  className="flex font-medium text-xl p-3 text-text-primary hover:bg-text-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.url);
                  }}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
