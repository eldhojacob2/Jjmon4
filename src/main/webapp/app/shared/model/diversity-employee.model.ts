import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';
import { IRoles } from 'app/shared/model/roles.model';

export interface IDiversityEmployee {
  id?: number;
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  employee?: IDiversitySurveyData;
  roles?: IRoles[];
}

export class DiversityEmployee implements IDiversityEmployee {
  constructor(
    public id?: number,
    public employeeId?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public employee?: IDiversitySurveyData,
    public roles?: IRoles[]
  ) {}
}
