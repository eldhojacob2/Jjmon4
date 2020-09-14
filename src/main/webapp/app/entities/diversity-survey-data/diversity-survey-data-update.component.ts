import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiversitySurveyData, DiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';
import { DiversitySurveyDataService } from './diversity-survey-data.service';

@Component({
  selector: 'jhi-diversity-survey-data-update',
  templateUrl: './diversity-survey-data-update.component.html',
})
export class DiversitySurveyDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    customAnswer: [],
  });

  constructor(
    protected diversitySurveyDataService: DiversitySurveyDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversitySurveyData }) => {
      this.updateForm(diversitySurveyData);
    });
  }

  updateForm(diversitySurveyData: IDiversitySurveyData): void {
    this.editForm.patchValue({
      id: diversitySurveyData.id,
      customAnswer: diversitySurveyData.customAnswer,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diversitySurveyData = this.createFromForm();
    if (diversitySurveyData.id !== undefined) {
      this.subscribeToSaveResponse(this.diversitySurveyDataService.update(diversitySurveyData));
    } else {
      this.subscribeToSaveResponse(this.diversitySurveyDataService.create(diversitySurveyData));
    }
  }

  private createFromForm(): IDiversitySurveyData {
    return {
      ...new DiversitySurveyData(),
      id: this.editForm.get(['id'])!.value,
      customAnswer: this.editForm.get(['customAnswer'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiversitySurveyData>>): void {
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
}
