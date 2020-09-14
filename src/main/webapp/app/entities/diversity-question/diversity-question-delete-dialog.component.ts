import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';
import { DiversityQuestionService } from './diversity-question.service';

@Component({
  templateUrl: './diversity-question-delete-dialog.component.html',
})
export class DiversityQuestionDeleteDialogComponent {
  diversityQuestion?: IDiversityQuestion;

  constructor(
    protected diversityQuestionService: DiversityQuestionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diversityQuestionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diversityQuestionListModification');
      this.activeModal.close();
    });
  }
}
