import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';
import { DiversityQuestionService } from './diversity-question.service';
import { DiversityQuestionDeleteDialogComponent } from './diversity-question-delete-dialog.component';

@Component({
  selector: 'jhi-diversity-question',
  templateUrl: './diversity-question.component.html',
})
export class DiversityQuestionComponent implements OnInit, OnDestroy {
  diversityQuestions?: IDiversityQuestion[];
  eventSubscriber?: Subscription;

  constructor(
    protected diversityQuestionService: DiversityQuestionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.diversityQuestionService
      .query()
      .subscribe((res: HttpResponse<IDiversityQuestion[]>) => (this.diversityQuestions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiversityQuestions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiversityQuestion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiversityQuestions(): void {
    this.eventSubscriber = this.eventManager.subscribe('diversityQuestionListModification', () => this.loadAll());
  }

  delete(diversityQuestion: IDiversityQuestion): void {
    const modalRef = this.modalService.open(DiversityQuestionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diversityQuestion = diversityQuestion;
  }
}
