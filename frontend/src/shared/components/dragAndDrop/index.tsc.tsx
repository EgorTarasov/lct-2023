import React, { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import AttatchmentSvg from "@/assets/attatchment.svg";

interface DragDropFileProps {
  onUpload: (files: File[]) => void;
  acceptableFormats?: string[];
  dropZone?: React.ReactNode;
}

const DragDropFile = (x: DragDropFileProps) => {
  const [drag, setDrag] = useState(false);
  const id = useId();

  const onDragStart = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    x.onUpload(files);
    setDrag(false);
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = [...e.target.files];
    x.onUpload(files);
    e.target.value = "";
  };

  return (
    <form
      className="w-full"
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragOver={onDragStart}
      onDrop={onDrop}>
      <input
        className="hidden"
        id={id}
        type="file"
        accept={x.acceptableFormats?.join(",")}
        multiple
        onChange={(e) => onFileUpload(e)}
      />
      <div
        className={twMerge(
          "select-none text-center text-base transition-colors bg-transparent w-full text-text-gray rounded-xl border-2 border-dashed border-gray-400",
          drag ? "border-primary" : "border-gray-400"
        )}>
        {drag && (
          <div className="absolute inset-0 flex items-center justify-center w-full h-full text-2xl font-medium text-text-gray bg-gray-400 bg-opacity-25 rounded-xl">
            Отпустите файлы, чтобы загрузить
          </div>
        )}
        <label
          className="py-4 justify-center w-full cursor-pointer px-6 flex gap-2 items-center"
          htmlFor={id}>
          <AttatchmentSvg className={"w-5 h-5 min-w-[20px]"} />
          {x.dropZone ? x.dropZone : "Перетащите файлы сюда или нажмите, чтобы выбрать файлы"}
        </label>
      </div>
    </form>
  );
};

export default DragDropFile;
