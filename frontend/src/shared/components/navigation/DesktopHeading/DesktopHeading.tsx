import { Link } from "react-router-dom";

export const DesktopHeading = () => {
  return (
    <>
      {/* measurer */}
      <div className="hidden sm:flex [grid-area:desktop] w-[340px]" aria-hidden="true" />
      <header className="hidden sm:flex fixed left-0 bottom-0 top-0 w-[340px]">
        <nav>
          <ul>
            <Link to="/main">Main</Link>
          </ul>
        </nav>
        Heading
      </header>
    </>
  );
};
