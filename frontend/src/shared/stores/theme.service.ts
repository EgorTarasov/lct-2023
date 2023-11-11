/** Этот класс будет отвечать за работу с темой от бэкенда */
import { makeAutoObservable } from "mobx";
import logo from "@/assets/moc/logo.svg?url";
import { ThemeEndpoint } from "api/endpoints/theme.endpoint";
import { hexToRgb, shouldUseWhiteText } from "@/utils/hexToRgb";
import { ThemeDto } from "api/models/theme.model";

interface exampleStyleConfig {
  color: string;
  companyName: string;
  logoSvg: string;
}

//Моковый конфиг для тестирования
const exampleStyleConfig: exampleStyleConfig = {
  color: "44 85 222",
  companyName: "PROSCOM",
  logoSvg: logo
};

const LOADING_TIME = 500;

export class ThemeServiceViewModel {
  themeConfig: exampleStyleConfig | null = null;
  item: ThemeDto.Item | null = null;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this._init();
  }

  public async _init() {
    const res = await ThemeEndpoint.current();
    //   body {
    //     --color-primary: 44, 85, 222;
    //     --color-onPrimary: 255, 255, 255;
    // }
    this.item = res;
    document.body.style.setProperty("--color-primary", hexToRgb(res.main_color.replace("#", "")));
    document.body.style.setProperty(
      "--color-onPrimary",
      shouldUseWhiteText(res.main_color) ? "255, 255, 255" : "29, 29, 29"
    );
    this.themeConfig = {
      color: res.main_color,
      companyName: res.company_name,
      logoSvg: res.company_logo
    };
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.cdnfonts.com/css/sf-pro-display";
    document.head.appendChild(link);
    document.body.style.fontFamily = "SF Pro Display, Arial, sans-serif";
    this.isLoaded = true;
  }
}

export const ThemeService = new ThemeServiceViewModel();
