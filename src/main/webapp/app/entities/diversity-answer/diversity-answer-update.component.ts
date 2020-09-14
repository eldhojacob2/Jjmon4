import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiversityAnswer, DiversityAnswer } from 'app/shared/model/diversity-answer.model';
import { DiversityAnswerService } from './diversity-answer.service';
import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';
import { DiversityQuestionService } from 'app/entities/diversity-question/diversity-question.service';
import { IDiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';
import { DiversityQuestCategoryService } from 'app/entities/diversity-quest-category/diversity-quest-category.service';

type SelectableEntity = IDiversityQuestion | IDiversityQuestCategory;

@Component({
  selector: 'jhi-diversity-answer-update',
  templateUrl: './diversity-answer-update.component.html',
})
export class DiversityAnswerUpdateComponent implements OnInit {
  isSaving = false;
  diversityquestions: IDiversityQuestion[] = [];
  diversityquestcategories: IDiversityQuestCategory[] = [];

  editForm = this.fb.group({
    id: [],
    answerSeqNo: [],
    answerType: [],
    answerCustomLabel: [],
    answerDesc: [],
    question: [],
    questCategory: [],
  });

  constructor(
    protected diversityAnswerService: DiversityAnswerService,
    protected diversityQuestionService: DiversityQuestionService,
    protected diversityQuestCategoryService: DiversityQuestCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityAnswer }) => {
      this.updateForm(diversityAnswer);

      this.diversityQuestionService
        .query()
        .subscribe((res: HttpResponse<IDiversityQuestion[]>) => (this.diversityquestions = res.body || []));

      this.diversityQuestCategoryService
        .query()
        .subscribe((res: HttpResponse<IDiversityQuestCategory[]>) => (this.diversityquestcategories = res.body || []));
    });
  }

  updateForm(diversityAnswer: IDiversityAnswer): void {
    this.editForm.patchValue({
      id: diversityAnswer.id,
      answerSeqNo: diversityAnswer.answerSeqNo,
      answerType: diversityAnswer.answerType,
      answerCustomLabel: diversityAnswer.answerCustomLabel,
      answerDesc: diversityAnswer.answerDesc,
      question: diversityAnswer.question,
      questCategory: diversityAnswer.questCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diversityAnswer = this.createFromForm();
    if (diversityAnswer.id !== undefined) {
      this.subscribeToSaveResponse(this.diversityAnswerService.update(diversityAnswer));
    } else {
      this.subscribeToSaveResponse(this.diversityAnswerService.create(diversityAnswer));
    }
  }

  private createFromForm(): IDiversityAnswer {
    return {
      ...new DiversityAnswer(),
      id: this.editForm.get(['id'])!.value,
      answerSeqNo: this.editForm.get(['answerSeqNo'])!.value,
      answerType: this.editForm.get(['answerType'])!.value,
      answerCustomLabel: this.editForm.get(['answerCustomLabel'])!.value,
      answerDesc: this.editForm.get(['answerDesc'])!.value,
      question: this.editForm.get(['question'])!.value,
      questCategory: this.editForm.get(['questCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiversityAnswer>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
