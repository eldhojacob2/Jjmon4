import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiversityAnswer } from 'app/shared/model/diversity-answer.model';
import { DiversityAnswerService } from './diversity-answer.service';

@Component({
  templateUrl: './diversity-answer-delete-dialog.component.html',
})
export class DiversityAnswerDeleteDialogComponent {
  diversityAnswer?: IDiversityAnswer;

  constructor(
    protected diversityAnswerService: DiversityAnswerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diversityAnswerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diversityAnswerListModification');
      this.activeModal.close();
    });
  }
}
