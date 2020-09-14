import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';
import { DiversityQuestCategoryService } from './diversity-quest-category.service';

@Component({
  templateUrl: './diversity-quest-category-delete-dialog.component.html',
})
export class DiversityQuestCategoryDeleteDialogComponent {
  diversityQuestCategory?: IDiversityQuestCategory;

  constructor(
    protected diversityQuestCategoryService: DiversityQuestCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diversityQuestCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diversityQuestCategoryListModification');
      this.activeModal.close();
    });
  }
}
