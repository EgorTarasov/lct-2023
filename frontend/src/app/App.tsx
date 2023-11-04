import "./index.css";
import ViteSvg from "../vite.svg";
import { useState } from "react";
import { Button, DialogBase } from "@/ui";
import { DesktopHeading } from "@/components/navigation/DesktopHeading";
import { ID } from "@/constants/ids";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <DesktopHeading />
        <ViteSvg />
        <main id="content" tabIndex={-1}>
          <Router />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
