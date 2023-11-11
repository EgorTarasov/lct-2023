import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { PositionEndpoint } from "api/endpoints/position.endpoint";
import { CourseDto } from "api/models/course.model";
import { makeAutoObservable } from "mobx";

export class AdminOnboardingPageViewModel {
  public uploadedFiles: File[] = [];
  public onboarding: CourseDto.AdminResult | null = null;
  public quizes: CourseDto.Quiz[] = [];
  public positions: {
    uploadedFiles: File[];
    items: CourseDto.Result[];
  }[] = [];
  public query = "";
  get filteredPositions() {
    return this.positions.filter((position) => {
      if (!this.query) return true;
      return position.items.some((item) =>
        item.name.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }
  public isLoading = false;

  constructor() {
    makeAutoObservable(this);

    void this.loadOnboarding();
    void this.loadPositions();
    void this.loadQuizes();
  }

  private async loadQuizes() {
    this.quizes = await CourseEndpoint.getQuizes();
  }

  private async loadOnboarding() {
    this.onboarding = await CourseEndpoint.onboarding();
  }

  private async loadPositions() {
    const positions = await PositionEndpoint.getAll();
    this.positions = await Promise.all(
      positions.map(async (position) => {
        const res = await CourseEndpoint.getByPositionId(position.id);
        return {
          items: res,
          uploadedFiles: [] as File[]
        };
      })
    );
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
}
