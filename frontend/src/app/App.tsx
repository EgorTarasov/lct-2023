import "./index.css";
import ViteSvg from "../vite.svg";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { DesktopHeading } from "@/components/navigation";

function App() {
  return (
    <BrowserRouter>
      <DesktopHeading />
      <ViteSvg />
      <main id="content" tabIndex={-1}>
        <Router />
      </main>
    </BrowserRouter>
  );
}

export default App;
