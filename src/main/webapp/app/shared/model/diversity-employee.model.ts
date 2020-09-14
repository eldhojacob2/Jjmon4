import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';

export interface IDiversityEmployee {
  id?: number;
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  employee?: IDiversitySurveyData;
}

export class DiversityEmployee implements IDiversityEmployee {
  constructor(
    public id?: number,
    public employeeId?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public employee?: IDiversitySurveyData
  ) {}
}
