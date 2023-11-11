import { Button, DialogBase, IconText, Input } from "@/ui";
import CalendarIcon from "@/assets/calendar.svg";
import { convertDate } from "@/utils/dateConverters.ts";
import ClockIcon from "@/assets/clock.svg";
import LightningIcon from "@/assets/lightning.svg";
import CousreSvg from "@/assets/course.svg";
import CloseSvg from "@/assets/clear.svg";
import EditSvg from "@/assets/edit.svg";
import { FormEvent, useState } from "react";
import DragDropFile from "@/components/dragAndDrop/index.tsc.tsx";
import { UploadedFile } from "@/components/uploadedFile/uploadedFile.tsx";
import { CourseDto, MockCourses } from "api/models/course.model.ts";

interface ICourseCardProps {
  item: CourseDto.Item;
}

const CourseCard = (x: ICourseCardProps) => {
  const [isEditMode, setEditMode] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleUpdateCourse = () => {
    console.log("update course");
    setEditMode(false);
  };
  const handleDeleteCourse = () => {
    console.log("delete course");
    setEditMode(false);
  };

  return (
    <>
      <article className="flex flex-row gap-4 p-4 bg-white rounded-2xl border border-text-primary/20 relative">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-text-primary/20">
          <CousreSvg className="w-6 h-6 color-text-primary" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h4 className="leading-5 text-lg max-w-[80%]">{x.item.title}</h4>
          <ul className="flex flex-wrap gap-2 items-center">
            <IconText icon={CalendarIcon} alt="Дедлайн" text={convertDate(x.item.deadline)} />
            <IconText
              icon={ClockIcon}
              alt="Время выполнения"
              text={x.item.timeEstimateMin.toString()}
            />
            <IconText
              icon={LightningIcon}
              alt="Баллы"
              text={x.item.points.toString()}
              iconPrimary
            />
          </ul>
        </div>
        <button
          className={"absolute top-3 right-3"}
          aria-label={"Удалить задание"}
          onClick={() => {}}>
          <CloseSvg className={"w-6 h-6"} onClick={handleDeleteCourse} />
        </button>
        <button
          className={"absolute top-3 right-9"}
          aria-label={"Редактировать курс"}
          onClick={() => setEditMode(true)}>
          <EditSvg className={"w-6 h-6"} onClick={() => setEditMode(true)} />
        </button>
      </article>
      <DialogBase
        isOpen={isEditMode}
        width={555}
        title="Новый образовательный материал"
        onCancel={() => setEditMode(false)}
        confirmText="Добавить образовательный материал">
        <form className="flex flex-col gap-4" onSubmit={handleUpdateCourse}>
          <Input
            placeholder="Новый курс"
            required
            id="title"
            label={"Название"}
            defaultValue={x.item.title}
          />
          <div className="flex flex-col gap-2">
            <span className="text-text-primary/60">Загрузите необходимые материалы</span>
            <DragDropFile
              onUpload={(files) => setFiles(files)}
              dropZone={
                <span>
                  Перетащите сюда или выберите <b>.docx</b>
                </span>
              }
              acceptableFormats={[".docx"]}
            />
          </div>
          {x.item.files.map((file, index) => (
            <UploadedFile key={index} title={file.name} onRemove={() => {}} />
          ))}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Input
              id="time_estimate"
              label="Трудозатратность (мин)"
              placeholder="60 мин"
              className="flex-1"
              defaultValue={x.item.timeEstimateMin.toString()}
              required
            />
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="points" className="text-text-primary/60">
                Баллы за выполнение
              </label>
              <div className="flex items-center gap-2">
                <LightningIcon className="text-text-primary w-6 min-w-[24px]" />
                <Input
                  id="points"
                  className="remove-arrow"
                  type="number"
                  required
                  defaultValue={x.item.points.toString()}
                />
              </div>
            </div>
          </div>
          <button
            className={
              "w-full bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
            }>
            Добавить образовательный материал
          </button>
        </form>
      </DialogBase>
    </>
  );
};
export const AdminEducationPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
        <div className="flex-col item-center gap-4 sm:flex sm:flex-row sm:justify-between">
          <h1 className={"text-2xl font-medium sm:text-2xl"}>Все образовательные материалы</h1>
          <Button className="max-w-[156px]" onClick={() => setShowCreateDialog(true)}>
            Добавить курс
          </Button>
        </div>
        <Input placeholder="Поиск по курсам" />
        <ul className="grid gap items-center gap-4 grid-cols-1 desktop:grid-cols-2">
          {MockCourses.map((v, i) => (
            <CourseCard key={i} item={v} />
          ))}
        </ul>
      </div>
      <DialogBase
        isOpen={showCreateDialog}
        width={555}
        title="Новый образовательный материал"
        onCancel={() => setShowCreateDialog(false)}
        confirmText="Добавить образовательный материал">
        <form className="flex flex-col gap-4">
          <Input placeholder="Новый курс" required id="title" label={"Название"} />
          <div className="flex flex-col gap-2">
            <span className="text-text-primary/60">Загрузите необходимые материалы</span>
            <DragDropFile
              onUpload={(files) => setFiles(files)}
              dropZone={
                <span>
                  Перетащите сюда или выберите <b>.docx</b>
                </span>
              }
              acceptableFormats={[".docx"]}
            />
          </div>
          {files.map((file, index) => (
            <UploadedFile
              key={index}
              title={file.name}
              onRemove={() => setFiles((prev) => prev.filter((f) => f !== file))}
            />
          ))}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Input
              id="time_estimate"
              label="Трудозатратность (мин)"
              placeholder="60 мин"
              className="flex-1"
              required
            />
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="points" className="text-text-primary/60">
                Баллы за выполнение
              </label>
              <div className="flex items-center gap-2">
                <LightningIcon className="text-text-primary w-6 min-w-[24px]" />
                <Input id="points" className="remove-arrow" type="number" required />
              </div>
            </div>
          </div>
          <button
            className={
              "w-full bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
            }>
            Добавить образовательный материал
          </button>
        </form>
      </DialogBase>
    </>
  );
};
