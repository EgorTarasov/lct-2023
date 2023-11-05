import { Link } from "react-router-dom";

export const DesktopHeading = () => {
  return (
    <header className="flex">
      <nav>
        <ul>
          <Link to="/main">Main</Link>
        </ul>
      </nav>
      Heading
    </header>
  );
};
