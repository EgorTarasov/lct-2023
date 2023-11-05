/** Этот класс будет отвечать за работу с темой от бэкенда */
import { makeAutoObservable } from "mobx";
import logo from "@/assets/moc/logo.svg?url";

//TODO: Создать и перенести в папку с моделями
interface exampleStyleConfig {
  font: {
    fontName: string;
    link: string;
  };
  logoUrl: string;
}

//Моковый конфиг для тестирования
const exampleStyleConfig: exampleStyleConfig = {
  font: {
    fontName: "SF Pro Display",
    link: "https://fonts.cdnfonts.com/css/sf-pro-display"
  },
  logoUrl: logo
};

const LOADING_TIME = 500;

export class ThemeServiceViewModel {
  themeConfig: exampleStyleConfig | null = null;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this._init();
  }

  private _init() {
    console.log("init");
    setTimeout(() => {
      console.log("set timeout");
      this.themeConfig = exampleStyleConfig;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = exampleStyleConfig.font.link;
      document.head.appendChild(link);
      document.body.style.fontFamily = `${exampleStyleConfig.font.fontName}, Arial, sans-serif`;
      this.isLoaded = true;
      console.log("this.isLoaded", this.isLoaded);
    }, LOADING_TIME);
  }
}

export const ThemeService = new ThemeServiceViewModel();
