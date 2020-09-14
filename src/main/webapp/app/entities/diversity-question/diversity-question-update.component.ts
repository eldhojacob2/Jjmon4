import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiversityQuestion, DiversityQuestion } from 'app/shared/model/diversity-question.model';
import { DiversityQuestionService } from './diversity-question.service';
import { IDiversityTheme } from 'app/shared/model/diversity-theme.model';
import { DiversityThemeService } from 'app/entities/diversity-theme/diversity-theme.service';

@Component({
  selector: 'jhi-diversity-question-update',
  templateUrl: './diversity-question-update.component.html',
})
export class DiversityQuestionUpdateComponent implements OnInit {
  isSaving = false;
  diversitythemes: IDiversityTheme[] = [];

  editForm = this.fb.group({
    id: [],
    questionSeqNo: [],
    questionNo: [],
    questionDesc: [],
    theme: [],
  });

  constructor(
    protected diversityQuestionService: DiversityQuestionService,
    protected diversityThemeService: DiversityThemeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityQuestion }) => {
      this.updateForm(diversityQuestion);

      this.diversityThemeService.query().subscribe((res: HttpResponse<IDiversityTheme[]>) => (this.diversitythemes = res.body || []));
    });
  }

  updateForm(diversityQuestion: IDiversityQuestion): void {
    this.editForm.patchValue({
      id: diversityQuestion.id,
      questionSeqNo: diversityQuestion.questionSeqNo,
      questionNo: diversityQuestion.questionNo,
      questionDesc: diversityQuestion.questionDesc,
      theme: diversityQuestion.theme,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diversityQuestion = this.createFromForm();
    if (diversityQuestion.id !== undefined) {
      this.subscribeToSaveResponse(this.diversityQuestionService.update(diversityQuestion));
    } else {
      this.subscribeToSaveResponse(this.diversityQuestionService.create(diversityQuestion));
    }
  }

  private createFromForm(): IDiversityQuestion {
    return {
      ...new DiversityQuestion(),
      id: this.editForm.get(['id'])!.value,
      questionSeqNo: this.editForm.get(['questionSeqNo'])!.value,
      questionNo: this.editForm.get(['questionNo'])!.value,
      questionDesc: this.editForm.get(['questionDesc'])!.value,
      theme: this.editForm.get(['theme'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiversityQuestion>>): void {
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

  trackById(index: number, item: IDiversityTheme): any {
    return item.id;
  }
}
