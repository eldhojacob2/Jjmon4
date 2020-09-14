import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRoles, Roles } from 'app/shared/model/roles.model';
import { RolesService } from './roles.service';
import { IDiversityEmployee } from 'app/shared/model/diversity-employee.model';
import { DiversityEmployeeService } from 'app/entities/diversity-employee/diversity-employee.service';

@Component({
  selector: 'jhi-roles-update',
  templateUrl: './roles-update.component.html',
})
export class RolesUpdateComponent implements OnInit {
  isSaving = false;
  diversityemployees: IDiversityEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    roleType: [],
    employee: [],
  });

  constructor(
    protected rolesService: RolesService,
    protected diversityEmployeeService: DiversityEmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ roles }) => {
      this.updateForm(roles);

      this.diversityEmployeeService
        .query()
        .subscribe((res: HttpResponse<IDiversityEmployee[]>) => (this.diversityemployees = res.body || []));
    });
  }

  updateForm(roles: IRoles): void {
    this.editForm.patchValue({
      id: roles.id,
      roleType: roles.roleType,
      employee: roles.employee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const roles = this.createFromForm();
    if (roles.id !== undefined) {
      this.subscribeToSaveResponse(this.rolesService.update(roles));
    } else {
      this.subscribeToSaveResponse(this.rolesService.create(roles));
    }
  }

  private createFromForm(): IRoles {
    return {
      ...new Roles(),
      id: this.editForm.get(['id'])!.value,
      roleType: this.editForm.get(['roleType'])!.value,
      employee: this.editForm.get(['employee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoles>>): void {
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

  trackById(index: number, item: IDiversityEmployee): any {
    return item.id;
  }
}
