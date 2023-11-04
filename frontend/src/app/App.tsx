import "./index.css";
import ViteSvg from "../vite.svg";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { DesktopHeading } from "@/components/navigation";
import { AuthService } from "@/stores/auth.service";

function App() {
  AuthService;
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
