import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';
import { DiversityQuestCategoryService } from './diversity-quest-category.service';
import { DiversityQuestCategoryDeleteDialogComponent } from './diversity-quest-category-delete-dialog.component';

@Component({
  selector: 'jhi-diversity-quest-category',
  templateUrl: './diversity-quest-category.component.html',
})
export class DiversityQuestCategoryComponent implements OnInit, OnDestroy {
  diversityQuestCategories?: IDiversityQuestCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected diversityQuestCategoryService: DiversityQuestCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.diversityQuestCategoryService
      .query()
      .subscribe((res: HttpResponse<IDiversityQuestCategory[]>) => (this.diversityQuestCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiversityQuestCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiversityQuestCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiversityQuestCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('diversityQuestCategoryListModification', () => this.loadAll());
  }

  delete(diversityQuestCategory: IDiversityQuestCategory): void {
    const modalRef = this.modalService.open(DiversityQuestCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diversityQuestCategory = diversityQuestCategory;
  }
}
