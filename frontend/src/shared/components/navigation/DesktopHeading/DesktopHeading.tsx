import { Button, Logo, Separator } from "@/ui";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { RouteType, RoutesStore } from "../../../../app/routes";
import LightningIcon from "@/assets/lightning.svg";
import { observer } from "mobx-react-lite";
import { UserStore } from "@/stores/user.store";
import LogoutIcon from "../assets/logout.svg";
import { AuthService } from "@/stores/auth.service";

const NavItem = ({ item }: { item: RouteType }) => (
  <NavLink
    to={item.path}
    className={({ isActive }) =>
      twMerge(
        "px-4 py-3 w-full hover:text-text-primary hover:bg-text-primary/5 rounded-xl text-text-primary/60",
        isActive && "!text-primary !bg-primary/10"
      )
    }>
    {item.title}
  </NavLink>
);

export const DesktopHeading = observer(() => {
  return (
    <>
      {/* measurer */}
      <div
        className="hidden sm:flex [grid-area:desktop] w-[190px] desktop:w-[300px] bg-white"
        aria-hidden="true"
      />
      <aside className="hidden sm:flex fixed left-0 bottom-0 top-0 w-[190px] desktop:w-[300px] flex-col px-2 desktop:px-4 py-8">
        <Logo className="w-3/4 max-w-[150px]" />
        <nav className="flex-1 h-full flex flex-col overflow-y-hidden overflow-x-visible w-full">
          <ul className="flex flex-col gap-1 mt-10 overflow-y-auto overflow-x-visible">
            <li
              className={twMerge(
                "flex text-text-primary/30 justify-between items-center px-4 py-3 w-full cursor-default rounded-xl select-none"
              )}>
              Профиль
              {UserStore.points && (
                <div className="flex items-center gap-1 text-text-primary/60">
                  <LightningIcon className="text-primary" width={24} />
                  {UserStore.points}
                </div>
              )}
            </li>
            {RoutesStore.routes
              .filter((r) => r.showInNav)
              .map((item, i) => (
                <li key={i} className="flex w-full">
                  <NavItem item={item} />
                </li>
              ))}
            <Separator className="my-3" />
            <button
              className="px-4 py-3 flex items-center gap-3 hover:text-text-primary hover:bg-text-primary/5 rounded-xl text-text-primary/60"
              onClick={() => AuthService.logout()}>
              <LogoutIcon aria-hidden="true" width={24} />
              <span className="mb-px">Выход</span>
            </button>
          </ul>
        </nav>
      </aside>
    </>
  );
});
