import { CommonDto } from "@/utils/common-dto";
import { AdminEndpoint } from "api/endpoints/admin.endpoint";
import { PositionEndpoint } from "api/endpoints/position.endpoint";
import { UserDto } from "api/models/user.model";
import { makeAutoObservable, runInAction } from "mobx";
import { TaskDto } from "api/models/task.model.ts";
import { TasksEndpoint } from "api/endpoints/tasks.endpoint.ts";

type UserUpdate = Record<
  "first_name" | "last_name" | "middle_name" | "phone" | "email" | "goal",
  string
>;

export class EmployeesPageViewModel {
  public mentees: UserDto.Item[] = [];
  public positions: CommonDto.Named<number>[] = [];
  public selectedPosition: CommonDto.Named<number> | null = null;
  public tasks: { userId: number; tasks: TaskDto.Result[] }[] = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  async init() {
    this.mentees = await AdminEndpoint.getMentees();
    this.positions = await PositionEndpoint.getAll();
    await runInAction(async () => {
      for (const mentee of this.mentees) {
        const res = await TasksEndpoint.getMenteeTasks(mentee.id);
        this.tasks.push({ userId: mentee.id, tasks: res });
      }
    });
    this.isLoading = false;
  }

  async registerUser(item: UserUpdate): Promise<boolean> {
    if (!this.selectedPosition) return false;

    await AdminEndpoint.registerUser({
      first_name: item.first_name,
      last_name: item.last_name,
      middle_name: item.middle_name,
      email: item.email,
      number: item.phone,
      adaptation_target: item.goal,
      starts_work_at: "2023-12-12",
      position_id: this.selectedPosition.id
    });

    return true;
  }

  createTask = async (item: TaskDto.Create) => {
    const res = await TasksEndpoint.create(item);
    return res;
  };

  removeTask = async (id: number) => {
    await TasksEndpoint.remove(id);
  };

  updateTask = async (id: number, item: TaskDto.Create) => {
    const res = await TasksEndpoint.update(id, item);
    return res;
  };
}
