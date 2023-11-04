import { Link } from "react-router-dom";

export const SkipToContent = () => {
  return (
    <a className="block w-0 h-0 overflow-hidden focus:h-auto focus:w-auto" href={"#content"}>
      К основной части
    </a>
  );
};

export const DesktopHeading = () => {
  return (
    <header className="flex">
      <SkipToContent />
      <nav>
        <ul>
          <Link to="/main">Main</Link>
        </ul>
      </nav>
      Heading
    </header>
  );
};
