import { CommonDto } from "@/utils/common-dto";
import { AdminEndpoint } from "api/endpoints/admin.endpoint";
import { PositionEndpoint } from "api/endpoints/position.endpoint";
import { UserEndpoint } from "api/endpoints/user.endpoint";
import { UserDto } from "api/models/user.model";
import { makeAutoObservable } from "mobx";

type UserUpdate = Record<
  "first_name" | "last_name" | "middle_name" | "phone" | "email" | "goal",
  string
>;

export class EmployeesPageViewModel {
  public mentees: UserDto.Item[] = [];
  public positions: CommonDto.Named<number>[] = [];
  public selectedPosition: CommonDto.Named<number> | null = null;

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  async init() {
    this.mentees = await AdminEndpoint.getMentees();
    this.positions = await PositionEndpoint.getAll();
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

  async createTask(item: {
    title: string;
    task_link: string;
    deadline: Date;
    time_estimate: string;
    points: string;
  }) {
    console.log("create task", item);

    return true;
  }
}
