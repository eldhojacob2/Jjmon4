export interface IDiversitySurveyData {
  id?: number;
  customAnswer?: string;
}

export class DiversitySurveyData implements IDiversitySurveyData {
  constructor(public id?: number, public customAnswer?: string) {}
}
