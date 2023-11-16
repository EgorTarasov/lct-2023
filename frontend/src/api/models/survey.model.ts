export namespace SurverDto {
  export interface FactTemplate {
    question: string;
    answer: string;
  }

  export interface Fact {
    question: string;
    answer: string;
    id: number;
  }

  export interface Survey {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    fact: Fact;
  }

  export interface SurveyToken {
    token: string;
  }

  export interface CheckSurvey {
    token: string;
    answer: string;
  }
}
