import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiversityAnswer } from 'app/shared/model/diversity-answer.model';
import { DiversityAnswerService } from './diversity-answer.service';
import { DiversityAnswerDeleteDialogComponent } from './diversity-answer-delete-dialog.component';

@Component({
  selector: 'jhi-diversity-answer',
  templateUrl: './diversity-answer.component.html',
})
export class DiversityAnswerComponent implements OnInit, OnDestroy {
  diversityAnswers?: IDiversityAnswer[];
  eventSubscriber?: Subscription;

  constructor(
    protected diversityAnswerService: DiversityAnswerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.diversityAnswerService.query().subscribe((res: HttpResponse<IDiversityAnswer[]>) => (this.diversityAnswers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiversityAnswers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiversityAnswer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiversityAnswers(): void {
    this.eventSubscriber = this.eventManager.subscribe('diversityAnswerListModification', () => this.loadAll());
  }

  delete(diversityAnswer: IDiversityAnswer): void {
    const modalRef = this.modalService.open(DiversityAnswerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diversityAnswer = diversityAnswer;
  }
}
