import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { AdminOnboardingPageViewModel, PositionItem } from "./adminOnboarding.vm";
import { Button, DialogBase, Input } from "@/ui";
import { useEffect, useState } from "react";
import { CourseDto } from "api/models/course.model";
import DragDropFile from "@/components/dragAndDrop/index.tsc";
import DropdownMultiple from "@/ui/DropdownMultiple";
import { UploadedFile } from "@/components/uploadedFile/uploadedFile";
import { AdminTaskCard } from "./adminOnboarding.page";
import { toJS } from "mobx";
import PlusIcon from "@/assets/plus.svg";
import Collapsible from "@/ui/Collapsible";

export const PositionsSection: FCVM<AdminOnboardingPageViewModel> = observer(({ vm }) => {
  // const [addCourseDialog, setAddCourseDialog] = useState<PositionItem | null>(null);

  const isUpdatedCoursesDiffers = (position: PositionItem) => {
    if (position.uploadedFiles.length > 0) return true;
    return (
      !position.item.every((v) => position.updatedCourses.some((vv) => vv === v.id)) ||
      !position.updatedCourses.every((v) => position.item.some((vv) => vv.id === v))
    );
  };

  return (
    <section className="flex flex-col gap-4 mt-4">
      <h2 className={"text-2xl font-medium sm:text-2xl"}>Онбординг по специальностям</h2>
      <Input
        placeholder="Поиск по специальностям"
        value={vm.query}
        onChange={(v) => (vm.query = v)}
      />
      <ul className="flex flex-col gap-6">
        {vm.filteredPositions.map((position, index) => (
          <li key={index} className="appear flex flex-col">
            <h3 className="text-2xl font-medium w-fit">{position.name}</h3>
            <div className="flex flex-col gap-3">
              <div className="appear flex flex-col gap-6">
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))"
                  }}>
                  <div className="flex flex-col bg-white px-8 rounded-2xl py-5">
                    <DragDropFile
                      onUpload={(files) => position.uploadedFiles.push(...files)}
                      dropZone={
                        <span>
                          Перетащите сюда или выберите <b>.docx</b>
                          <br />
                          или <b>текстовый файл</b>
                        </span>
                      }
                      acceptableFormats={[".docx"]}
                    />
                    <h5 className="text-lg font-medium my-4">Обучение</h5>
                    <DropdownMultiple<CourseDto.Result>
                      options={vm.courses}
                      render={(v) => v.name}
                      onChange={(v) => (position.updatedCourses = v.map((vv) => vv.id))}
                      value={vm.courses.filter((v) =>
                        position.updatedCourses.some((vv) => vv === v.id)
                      )}
                    />
                    {isUpdatedCoursesDiffers(position) && (
                      <Button
                        className="mt-6"
                        onClick={() => vm.updatePosition(position)}
                        disabled={vm.isLoading}>
                        Сохранить
                      </Button>
                    )}
                  </div>
                  <ul className="flex flex-col gap-3">
                    <h5 className="text-lg font-medium">Загруженные файлы</h5>
                    {position.files.map((file, index) => (
                      <AdminTaskCard key={index} file={file} />
                    ))}
                    {position.uploadedFiles.map((file, index) => (
                      <UploadedFile
                        key={index}
                        title={file.name}
                        onRemove={() => position.uploadedFiles.splice(index, 1)}
                        fileSize={file.size}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
});
// <DialogBase
//   isOpen={addCourseDialog !== null}
//   onCancel={() => setAddCourseDialog(null)}
//   title={`Новый курс для специальности: "${addCourseDialog?.name ?? ""}"`}>
//   <form className="flex flex-col gap-6">
//     {/* <DropdownMultiple
//       options={vm.courses}
//       render={(v) => v.name}
//       onChange={(v) => (addCourseDialog!.courses = v)}
//       value={addCourseDialog!.courses}
//     />
//     <Button
//       onClick={() => {
//         vm.addCourse(addCourseDialog!);
//         setAddCourseDialog(null);
//       }}>
//       Добавить
//     </Button> */}
//   </form>
// </DialogBase>
