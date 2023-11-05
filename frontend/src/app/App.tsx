import "./index.css";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  if (!ThemeService.isLoaded)
    return <div className={"w-full h-full flex items-center justify-center"}>⏳Загрузка...</div>;
  return (
    <BrowserRouter>
      <main id="content" tabIndex={-1} className={"w-full h-full"}>
        <Router />
      </main>
    </BrowserRouter>
  );
});

export default App;
