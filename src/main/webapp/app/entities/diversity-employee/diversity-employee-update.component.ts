import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiversityEmployee, DiversityEmployee } from 'app/shared/model/diversity-employee.model';
import { DiversityEmployeeService } from './diversity-employee.service';
import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';
import { DiversitySurveyDataService } from 'app/entities/diversity-survey-data/diversity-survey-data.service';

@Component({
  selector: 'jhi-diversity-employee-update',
  templateUrl: './diversity-employee-update.component.html',
})
export class DiversityEmployeeUpdateComponent implements OnInit {
  isSaving = false;
  diversitysurveydata: IDiversitySurveyData[] = [];

  editForm = this.fb.group({
    id: [],
    employeeId: [],
    firstName: [],
    lastName: [],
    email: [],
    employee: [],
  });

  constructor(
    protected diversityEmployeeService: DiversityEmployeeService,
    protected diversitySurveyDataService: DiversitySurveyDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityEmployee }) => {
      this.updateForm(diversityEmployee);

      this.diversitySurveyDataService
        .query()
        .subscribe((res: HttpResponse<IDiversitySurveyData[]>) => (this.diversitysurveydata = res.body || []));
    });
  }

  updateForm(diversityEmployee: IDiversityEmployee): void {
    this.editForm.patchValue({
      id: diversityEmployee.id,
      employeeId: diversityEmployee.employeeId,
      firstName: diversityEmployee.firstName,
      lastName: diversityEmployee.lastName,
      email: diversityEmployee.email,
      employee: diversityEmployee.employee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diversityEmployee = this.createFromForm();
    if (diversityEmployee.id !== undefined) {
      this.subscribeToSaveResponse(this.diversityEmployeeService.update(diversityEmployee));
    } else {
      this.subscribeToSaveResponse(this.diversityEmployeeService.create(diversityEmployee));
    }
  }

  private createFromForm(): IDiversityEmployee {
    return {
      ...new DiversityEmployee(),
      id: this.editForm.get(['id'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      employee: this.editForm.get(['employee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiversityEmployee>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDiversitySurveyData): any {
    return item.id;
  }
}
