import { IDiversityEmployee } from 'app/shared/model/diversity-employee.model';
import { EmployeeRoleType } from 'app/shared/model/enumerations/employee-role-type.model';

export interface IRoles {
  id?: number;
  roleType?: EmployeeRoleType;
  employee?: IDiversityEmployee;
}

export class Roles implements IRoles {
  constructor(public id?: number, public roleType?: EmployeeRoleType, public employee?: IDiversityEmployee) {}
}
