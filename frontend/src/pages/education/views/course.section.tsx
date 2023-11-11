import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";
import { CourseCard } from "@/components/cards/course-card.widget";
import ChevronIcon from "@/assets/chevron2.svg";
import { Button } from "@/ui";
import { TaskCard } from "@/components/cards/task-card.widget";
import { CourseDto } from "api/models/course.model";
import { Link } from "react-router-dom";

// export const TaskLink = ({ item, courseId }: { item: CourseDto.CourseFile, courseId: number }) => {
//   return (
//     <li>
//       <Link
//         to={`/ed`}
//         className={twMerge("relative flex gap-3 items-start", item.isCompleted && "opacity-60")}>
//         <Checkbox className={`mt-1 ${textColor}`} disabled checked={item.isCompleted} ariaHidden />
//         <div className="flex flex-col">
//           <span className={textColor}>{locale}</span>
//           <p className="text-lg leading-none">{item.title}</p>
//           <ul className="flex flex-wrap gap-2 mt-3">
//             <IconText
//               icon={isDeadlineClose ? FireIcon : CalendarIcon}
//               text={convertDate(item.deadline)}
//               alt="Конец срока"
//             />
//             <IconText
//               icon={ClockIcon}
//               text={convertMinutes(item.durationMin)}
//               alt={"Время проведения"}
//             />
//             <IconText
//               className={textColor}
//               icon={LightningIcon}
//               text={item.points.toString()}
//               alt="Очков за прохождение"
//             />
//             <IconText icon={PointIcon} text={item.location} alt="" />
//           </ul>
//         </div>
//         <Chevron className="ml-auto my-auto" />
//       </Link>
//     </li>
//   );
// };

export const CourseSection: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  if (vm.pageState.view !== "course") return null;

  const course = vm.pageState.course;

  return (
    <>
      <Button appearance="secondary" className="w-fit gap-1 text-text-primary/60 px-2">
        <ChevronIcon className="w-6 h-6 rotate-180" />
        Назад к курсам
      </Button>
      <div className="py-5 bg-white flex flex-col gap-4">
        <h2 className="font-medium text-2xl">{course.title}</h2>
        <ul>
          {/* {
            course.files.map((file, i) => (
              <TaskCard
          } */}
        </ul>
      </div>
    </>
  );
});
