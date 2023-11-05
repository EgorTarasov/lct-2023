import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../main.vm";
import SendIcon from "@/assets/send.svg";
import ChatBotIcon from "@/assets/chatBot.svg";
import { useState } from "react";

const mocData = [
  "Какие у меня есть льготы?",
  "Какой у меня режим работы?",
  "Расскажи про корпоративную культуру!"
];
export const AssistantSection: FCVM<MainPageViewModel> = ({ vm }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <section className="flex flex-col px-4 py-3 bg-primary gap-4" aria-label="Цифровой наставник">
      <h2 className="text-2xl font-bold text-white">Цифровой наставник</h2>
      <div className="flex bg-white rounded-xl p-3 items-center max-h-12">
        <ChatBotIcon className="h-8 w-8" aria-hidden="true" focusable="false" />
        <input
          className="w-full h-8 font-medium text-base text-black ml-2 focus:outline-none"
          placeholder="Введите вопрос"
          aria-label="Введите ваш вопрос здесь"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="w-fit" aria-label="Отправить вопрос">
          <SendIcon className="w-6 h-6" aria-hidden="true" focusable="false" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {mocData.map((item, index) => (
          <button
            key={index}
            onClick={() => setInputValue(item)}
            className="px-3 py-1 border rounded-tr-xl rounded-br-xl rounded-bl-xl w-fit text-white bg-primary focus:bg-white focus:text-primary"
            aria-label={`Спросить про ${item}`}>
            <p className="text-base">{item}</p>
          </button>
        ))}
      </div>
    </section>
  );
};