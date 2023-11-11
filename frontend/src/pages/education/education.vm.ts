import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { CourseDto } from "api/models/course.model";
import { makeAutoObservable } from "mobx";

export type EducationPageState =
  | {
      view: "loading";
    }
  | {
      view: "all";
      courses: CourseDto.Item[];
    }
  | {
      view: "course";
      courseId: string;
      course: CourseDto.Item;
    }
  | {
      view: "courseTask";
      courseId: string;
      taskId: string;
      taskTitle?: string;
      markdown: string;
      quiz: CourseDto.QuizFull;
      answers: Map<number, string | null>;
    };

export type ViewType = EducationPageState extends { view: infer V } ? V : never;

export class EducationPageViewModel {
  private courses: CourseDto.Item[] | null = null;
  public pageState: EducationPageState = { view: "loading" };

  constructor(courseId?: string, taskId?: string) {
    makeAutoObservable(this);
    void this.loadCourse(courseId, taskId);
  }

  public async load() {
    if (this.courses === null) {
      const res = await CourseEndpoint.current();
      this.courses = res.map(CourseDto.convertDtoToItem);
    }
    this.pageState = { view: "all", courses: this.courses };
  }

  public async loadCourse(id?: string, taskId?: string) {
    if (!id) {
      this.load();
      return;
    }

    try {
      const res = await CourseEndpoint.get(id);
      if (!taskId) {
        this.pageState = { view: "course", courseId: id, course: CourseDto.convertDtoToItem(res) };
        return;
      }

      const task = res.quizes.find((f) => f.id.toString() === taskId);
      if (!task) {
        window.location.href = "/education";
        return;
      }

      const quiz = await CourseEndpoint.getQuiz(task.id);

      const markdown = await CourseEndpoint.getTask(quiz.file.path);
      this.pageState = {
        view: "courseTask",
        courseId: id,
        taskId,
        markdown,
        taskTitle: quiz.title,
        quiz: quiz,
        answers: new Map()
      };
    } catch {
      window.location.href = "/education";
    }
  }

  public setAnswer(id: number, value: string | null) {
    if (this.pageState.view !== "courseTask") return;

    if (!this.pageState.answers) {
      this.pageState.answers = new Map();
    }

    this.pageState.answers.set(id, value);
  }

  public async checkAnswers(): Promise<number> {
    if (this.pageState.view !== "courseTask" || !this.pageState.quiz.questions) return 0;

    const quiz = this.pageState.quiz;
    const questions = quiz.questions;
    if (!questions) return 0;

    const answers = [...this.pageState.answers.entries()];

    const correct = await Promise.all(
      answers.map(async ([id, value]) => {
        if (!value) return false;

        const question = questions.find((f) => f.id === id);
        if (!question) return false;

        const res = await CourseEndpoint.checkAnswer(question.id, value);
        return res.is_correct;
      })
    );

    return correct.length;
  }
}
