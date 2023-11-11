import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { PositionEndpoint } from "api/endpoints/position.endpoint";
import { CourseDto } from "api/models/course.model";
import { makeAutoObservable } from "mobx";

export interface PositionItem {
  id: number;
  name: string;
  uploadedFiles: File[];
  files: CourseDto.CourseFile[];
  item: CourseDto.Result[];
  updatedCourses: number[];
}

export class AdminOnboardingPageViewModel {
  public uploadedFiles: File[] = [];
  public onboarding: CourseDto.AdminResult | null = null;
  public courses: CourseDto.Result[] = [];
  public positions: PositionItem[] = [];
  public query = "";
  get filteredPositions() {
    return this.positions.filter((position) => {
      if (!this.query) return true;
      return position.name.toLowerCase().includes(this.query.toLowerCase());
    });
  }
  public isLoading = false;

  constructor() {
    makeAutoObservable(this);

    void this.loadOnboarding();
    void this.loadPositions();
    void this.loadCourses();
  }

  private async loadCourses() {
    this.courses = await CourseEndpoint.getAll();
  }

  private async loadOnboarding() {
    this.onboarding = await CourseEndpoint.onboarding();
  }

  private async loadPositions() {
    const positions = await PositionEndpoint.getAll();
    this.positions = await Promise.all(
      positions.map(async (position) => {
        const res = await CourseEndpoint.getByPositionId(position.id);
        const files = await CourseEndpoint.getFilesByPositionId(position.id);
        // api/user/position/position_id/file
        return {
          id: position.id,
          name: position.name,
          uploadedFiles: [],
          files: files,
          item: res,
          updatedCourses: res.map((course) => course.id)
        } as PositionItem;
      })
    );
  }

  public async updatePosition(position: PositionItem) {
    const toDelete = position.item.filter((course) => !position.updatedCourses.includes(course.id));
    const toAdd = position.updatedCourses.filter(
      (id) => !position.item.find((course) => course.id === id)
    );

    toDelete.forEach((course) => {
      CourseEndpoint.deleteCourseFromPosition(position.id, course.id);
    });

    toAdd.forEach((id) => {
      CourseEndpoint.addCourseToPosition(position.id, id);
    });

    position.item = position.item.filter((course) => !toDelete.includes(course));
    position.item = [
      ...position.item,
      ...this.courses.filter((course) => toAdd.includes(course.id))
    ];
  }

  public addFiles(file: File[]) {
    this.uploadedFiles = [...this.uploadedFiles, ...file];
  }

  public removeFile(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
  }

  public async uploadOnboardingFiles() {
    if (!this.uploadedFiles.length) return;
    this.isLoading = true;
    try {
      CourseEndpoint.submitOnboardingFiles(this.uploadedFiles);
      this.uploadedFiles = [];
      this.loadOnboarding();
    } finally {
      this.isLoading = false;
    }
  }

  public async updatePositionCourses(positionId: number, courseIds: number[]) {
    // await CourseEndpoint.updatePositionCourses(positionId, courseIds);
    this.loadPositions();
  }
}
