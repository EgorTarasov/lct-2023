import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { AdminOnboardingPageViewModel } from "./adminOnboarding.vm";
import { Input } from "@/ui";
import { useEffect, useState } from "react";
import { CourseDto } from "api/models/course.model";
import DragDropFile from "@/components/dragAndDrop/index.tsc";
import DropdownMultiple from "@/ui/DropdownMultiple";

export const PositionsSection: FCVM<AdminOnboardingPageViewModel> = observer(({ vm }) => {
  return (
    <section className="flex flex-col gap-4 mt-4">
      <h2 className={"text-2xl font-medium sm:text-2xl"}>Онбординг по специальностям</h2>
      <Input
        placeholder="Поиск по специальностям"
        value={vm.query}
        onChange={(v) => (vm.query = v)}
      />
      <ul>
        {vm.filteredPositions.map((position, index) => (
          <li key={index} className="flex flex-col gap-6">
            <h3 className="text-2xl font-medium">{position.item.name}</h3>
            <div className="grid grid-cols-2">
              <div className="flex flex-col bg-white px-10 rounded-2xl py-5">
                <DragDropFile onUpload={console.log} />
                <h5 className="text-lg font-medium my-4">Обучение</h5>
                <DropdownMultiple
                  options={vm.quizes}
                  render={(v) => v.title}
                  onChange={(v) => (position.item.quizes = v)}
                  value={position.item.quizes}
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-lg font-medium">Загруженные файлы</h5>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
});
