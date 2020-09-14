import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';

export interface IDiversityTheme {
  id?: number;
  themeSeqNo?: number;
  themeName?: string;
  theme?: IDiversitySurveyData;
}

export class DiversityTheme implements IDiversityTheme {
  constructor(public id?: number, public themeSeqNo?: number, public themeName?: string, public theme?: IDiversitySurveyData) {}
}
