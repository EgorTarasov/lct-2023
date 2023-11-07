import { Logo } from "@/ui";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { RouteType, routes } from "../../../../app/routes";

const NavItem = ({ item }: { item: RouteType }) => (
  <NavLink
    to={item.path}
    className={({ isActive }) =>
      twMerge(
        "px-4 py-3 w-full hover:text-text-primary hover:bg-text-primary/5 rounded-xl text-text-primary/60",
        isActive && "!text-primary bg-primary/10"
      )
    }>
    {item.title}
  </NavLink>
);

export const DesktopHeading = () => {
  return (
    <>
      {/* measurer */}
      <div
        className="hidden sm:flex [grid-area:desktop] w-[180px] desktop:w-[300px] bg-white"
        aria-hidden="true"
      />
      <aside className="hidden sm:flex fixed left-0 bottom-0 top-0 w-[180px] desktop:w-[300px] flex-col px-2 desktop:px-4 py-8">
        <Logo className="w-3/4 max-w-[150px]" />
        <nav>
          <ul className="flex flex-col gap-1 mt-10">
            {routes
              .filter((route) => route.showInNav)
              .map((item, i) => (
                <li key={i} className="flex w-full">
                  <NavItem item={item} />
                </li>
              ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
