import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiversityTheme, DiversityTheme } from 'app/shared/model/diversity-theme.model';
import { DiversityThemeService } from './diversity-theme.service';
import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';
import { DiversitySurveyDataService } from 'app/entities/diversity-survey-data/diversity-survey-data.service';

@Component({
  selector: 'jhi-diversity-theme-update',
  templateUrl: './diversity-theme-update.component.html',
})
export class DiversityThemeUpdateComponent implements OnInit {
  isSaving = false;
  diversitysurveydata: IDiversitySurveyData[] = [];

  editForm = this.fb.group({
    id: [],
    themeSeqNo: [],
    themeName: [],
    theme: [],
  });

  constructor(
    protected diversityThemeService: DiversityThemeService,
    protected diversitySurveyDataService: DiversitySurveyDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityTheme }) => {
      this.updateForm(diversityTheme);

      this.diversitySurveyDataService
        .query()
        .subscribe((res: HttpResponse<IDiversitySurveyData[]>) => (this.diversitysurveydata = res.body || []));
    });
  }

  updateForm(diversityTheme: IDiversityTheme): void {
    this.editForm.patchValue({
      id: diversityTheme.id,
      themeSeqNo: diversityTheme.themeSeqNo,
      themeName: diversityTheme.themeName,
      theme: diversityTheme.theme,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diversityTheme = this.createFromForm();
    if (diversityTheme.id !== undefined) {
      this.subscribeToSaveResponse(this.diversityThemeService.update(diversityTheme));
    } else {
      this.subscribeToSaveResponse(this.diversityThemeService.create(diversityTheme));
    }
  }

  private createFromForm(): IDiversityTheme {
    return {
      ...new DiversityTheme(),
      id: this.editForm.get(['id'])!.value,
      themeSeqNo: this.editForm.get(['themeSeqNo'])!.value,
      themeName: this.editForm.get(['themeName'])!.value,
      theme: this.editForm.get(['theme'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiversityTheme>>): void {
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
