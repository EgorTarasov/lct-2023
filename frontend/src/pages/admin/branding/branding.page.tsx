import { ThemeService } from "@/stores/theme.service";
import { Button, Input } from "@/ui";
import { hexToRgb } from "@/utils/hexToRgb";
import { Popover } from "@headlessui/react";
import { ThemeEndpoint } from "api/endpoints/theme.endpoint";
import { ThemeDto } from "api/models/theme.model";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { BlockPicker, ColorResult, RGBColor } from "react-color";

const textareaPlaceholder =
  // eslint-disable-next-line prettier/prettier
  "<svg fill=\"none\" shape-rendering=\"geometricPrecision\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M20 6L9 17l-5-5\"></path></svg>";

export const BrandingPage = observer(() => {
  const [color, setColor] = useState<string>(ThemeService.item?.main_color ?? "");
  const [logo, setLogo] = useState(ThemeService.item?.company_logo ?? "");
  const [comanyName, setComanyName] = useState<string>(ThemeService.item?.company_name ?? "");

  const onSubmit = async () => {
    if (!color || !logo || !comanyName) return;

    const rgb = hexToRgb(color);
    if (!rgb) return;

    const data: ThemeDto.Item = {
      company_logo: logo,
      company_name: comanyName,
      main_color: rgb
    };

    await ThemeEndpoint.update(data);

    ThemeService._init();
  };

  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Данные о брендинге</h1>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Основное</h2>
        <div className="flex-col gap-4 sm:flex sm:flex-row">
          <div className={"flex flex-col w-max align-start"}>
            <label htmlFor={"color-picker"} className={"text-text-primary/50 w-max"}>
              Корпоративный цвет
            </label>
            <Popover className="relative">
              <Popover.Button>
                <div
                  className={
                    "w-full flex items-center gap-4 p-3 rounded-lg h-11 bg-white outline-none transition-colors border border-text-primary/20 group-hover:border-text-primary/60 focus:!border-primary"
                  }>
                  <div
                    className={"w-6 h-6 rounded-lg"}
                    style={{
                      backgroundColor: color
                    }}
                  />
                  <input
                    className={"outline-0"}
                    type="text"
                    id="color-value"
                    value={color}
                    placeholder={"#000000"}
                  />
                </div>
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-full max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                <BlockPicker color={color} onChange={(v) => setColor(v.hex)} />
              </Popover.Panel>
            </Popover>
          </div>
          <div className={"flex flex-col w-full"}>
            <label htmlFor={"company-name"} className={"text-text-primary/50"}>
              Название компании
            </label>
            <Input
              placeholder="Название"
              value={comanyName}
              onChange={(v) => setComanyName(v)}
              title={"Название компании"}
              id={"company-name"}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Логотип</h2>
        <textarea
          id="goal"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="px-3 py-2 h-28 text-text-primary text-base border border-primary/20 rounded-lg w-full"
          placeholder={textareaPlaceholder}
        />
      </section>
      <Button className="mt-4" onClick={() => onSubmit()}>
        Обновить брендинг
      </Button>
    </div>
  );
});
