import ClearIcon from "@/assets/clear.svg";

interface IFile {
  title: string;
  url: string;
  onRemove: () => void;
}

export const UploadedFile = (x: IFile) => {
  return (
    <article
      className={
        "flex items-center justify-between border-b border-text-primary/20 underline py-3"
      }>
      <a download href={x.url} aria-label={`Скачать файл ${x.title}`}>
        {x.title}
      </a>
      <button onClick={x.onRemove} aria-label={`Удалить файл ${x.title}`}>
        <ClearIcon className="w-6 h-6 text-text-primary/60" />
        <span className="sr-only">Удалить</span>
      </button>
    </article>
  );
};
