import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';
import { DiversitySurveyDataService } from './diversity-survey-data.service';
import { DiversitySurveyDataDeleteDialogComponent } from './diversity-survey-data-delete-dialog.component';

@Component({
  selector: 'jhi-diversity-survey-data',
  templateUrl: './diversity-survey-data.component.html',
})
export class DiversitySurveyDataComponent implements OnInit, OnDestroy {
  diversitySurveyData?: IDiversitySurveyData[];
  eventSubscriber?: Subscription;

  constructor(
    protected diversitySurveyDataService: DiversitySurveyDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.diversitySurveyDataService
      .query()
      .subscribe((res: HttpResponse<IDiversitySurveyData[]>) => (this.diversitySurveyData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiversitySurveyData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiversitySurveyData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiversitySurveyData(): void {
    this.eventSubscriber = this.eventManager.subscribe('diversitySurveyDataListModification', () => this.loadAll());
  }

  delete(diversitySurveyData: IDiversitySurveyData): void {
    const modalRef = this.modalService.open(DiversitySurveyDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diversitySurveyData = diversitySurveyData;
  }
}
