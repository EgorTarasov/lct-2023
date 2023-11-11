import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../main.vm";
import SendIcon from "@/assets/send.svg";
import ChatBotIcon from "@/assets/chatBot.svg";
import { FormEvent, useId, useState } from "react";
import { Input } from "@/ui";
import { useIsMobile } from "@/hooks/useIsMobile";
import AssistantIllustration from "../assets/assistant.svg";
import { observer } from "mobx-react-lite";

const mocData = [
  "Какие у меня есть льготы?",
  "Какой у меня режим работы?",
  "Расскажи про корпоративную культуру!"
];
export const AssistantSection: FCVM<MainPageViewModel> = observer(({ vm }) => {
  const assistantId = useId();
  const [inputValue, setInputValue] = useState("");
  const isMobile = useIsMobile();

  const submitForm = async () => {
    // vm.sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex bg-primary sm:rounded-2xl sm:mt-10">
      <section
        className="px-4 py-3 flex flex-1 flex-col gap-4 sm:px-6 sm:py-6"
        aria-label="Цифровой наставник">
        <label
          htmlFor={assistantId}
          className="text-2xl font-bold text-white sm:text-4xl sm:font-medium">
          Цифровой наставник
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <Input
            rightIcon={<SendIcon />}
            leftIcon={
              isMobile && (
                <ChatBotIcon aria-label="На иллюстрации портрет улыбающегося человека в костюме, в роли цифрового наставника" />
              )
            }
            placeholder="Введите вопрос"
            aria-label="Введите ваш вопрос здесь"
            value={inputValue}
            onChange={(v) => setInputValue(v)}
          />
        </form>
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {mocData.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setInputValue(item);
                  document.getElementById(assistantId)!.focus();
                }}
                className="px-3 py-1 border rounded-tr-xl rounded-br-xl text-left rounded-bl-xl w-fit text-white bg-primary focus-visible:bg-white focus-visible:text-primary"
                aria-label={`Спросить про ${item}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <div className="w-full max-w-[34%] relative hidden desktop:flex desktop:rounded-2xl">
        <span className="text-center leading-tight absolute px-4 py-3 rounded-2xl text-onPrimary rounded-br-none hidden etalon:block bg-white/20 z-10 top-2.5 -left-5">
          Отвечу на любой вопрос
          <br /> о новой работе!
        </span>
        <AssistantIllustration
          className="mt-auto h-full right-0 scale-110 origin-bottom-right text-primary absolute"
          aria-label="На иллюстрации портрет улыбающегося человека в костюме, в роли цифрового наставника"
        />
      </div>
    </div>
  );
});
