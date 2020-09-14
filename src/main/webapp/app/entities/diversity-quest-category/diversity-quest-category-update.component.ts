import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiversityQuestCategory, DiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';
import { DiversityQuestCategoryService } from './diversity-quest-category.service';
import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';
import { DiversityQuestionService } from 'app/entities/diversity-question/diversity-question.service';

@Component({
  selector: 'jhi-diversity-quest-category-update',
  templateUrl: './diversity-quest-category-update.component.html',
})
export class DiversityQuestCategoryUpdateComponent implements OnInit {
  isSaving = false;
  diversityquestions: IDiversityQuestion[] = [];

  editForm = this.fb.group({
    id: [],
    categorySeqNo: [],
    categoryNo: [],
    categoryDesc: [],
    question: [],
  });

  constructor(
    protected diversityQuestCategoryService: DiversityQuestCategoryService,
    protected diversityQuestionService: DiversityQuestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityQuestCategory }) => {
      this.updateForm(diversityQuestCategory);

      this.diversityQuestionService
        .query()
        .subscribe((res: HttpResponse<IDiversityQuestion[]>) => (this.diversityquestions = res.body || []));
    });
  }

  updateForm(diversityQuestCategory: IDiversityQuestCategory): void {
    this.editForm.patchValue({
      id: diversityQuestCategory.id,
      categorySeqNo: diversityQuestCategory.categorySeqNo,
      categoryNo: diversityQuestCategory.categoryNo,
      categoryDesc: diversityQuestCategory.categoryDesc,
      question: diversityQuestCategory.question,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diversityQuestCategory = this.createFromForm();
    if (diversityQuestCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.diversityQuestCategoryService.update(diversityQuestCategory));
    } else {
      this.subscribeToSaveResponse(this.diversityQuestCategoryService.create(diversityQuestCategory));
    }
  }

  private createFromForm(): IDiversityQuestCategory {
    return {
      ...new DiversityQuestCategory(),
      id: this.editForm.get(['id'])!.value,
      categorySeqNo: this.editForm.get(['categorySeqNo'])!.value,
      categoryNo: this.editForm.get(['categoryNo'])!.value,
      categoryDesc: this.editForm.get(['categoryDesc'])!.value,
      question: this.editForm.get(['question'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiversityQuestCategory>>): void {
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

  trackById(index: number, item: IDiversityQuestion): any {
    return item.id;
  }
}
