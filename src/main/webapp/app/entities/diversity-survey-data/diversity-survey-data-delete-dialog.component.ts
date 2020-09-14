import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';
import { DiversitySurveyDataService } from './diversity-survey-data.service';

@Component({
  templateUrl: './diversity-survey-data-delete-dialog.component.html',
})
export class DiversitySurveyDataDeleteDialogComponent {
  diversitySurveyData?: IDiversitySurveyData;

  constructor(
    protected diversitySurveyDataService: DiversitySurveyDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diversitySurveyDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diversitySurveyDataListModification');
      this.activeModal.close();
    });
  }
}
