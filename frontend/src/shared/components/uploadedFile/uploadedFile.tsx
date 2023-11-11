import ClearIcon from "@/assets/clear.svg";

interface IFile {
  title: string;
  fileSize?: number;
  onRemove: () => void;
}

export const UploadedFile = (x: IFile) => {
  const convertFileSize = (size: number) => {
    const sizes = ["Б", "КБ", "МБ", "ГБ", "ТБ"];
    if (size === 0) return "0 Б";
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return Math.round((size / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <li className={"appear flex items-center justify-between border-b border-text-primary/20 py-3"}>
      <div className="inline">
        <span className="underline">{x.title}</span>
        {x.fileSize && (
          <span className="text-text-primary/60 ml-2">({convertFileSize(x.fileSize)})</span>
        )}
      </div>
      <button onClick={x.onRemove} aria-label={`Удалить файл ${x.title}`}>
        <ClearIcon className="w-6 h-6 text-text-primary/60" />
        <span className="sr-only">Удалить</span>
      </button>
    </li>
  );
};
