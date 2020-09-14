import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiversityEmployee } from 'app/shared/model/diversity-employee.model';
import { DiversityEmployeeService } from './diversity-employee.service';

@Component({
  templateUrl: './diversity-employee-delete-dialog.component.html',
})
export class DiversityEmployeeDeleteDialogComponent {
  diversityEmployee?: IDiversityEmployee;

  constructor(
    protected diversityEmployeeService: DiversityEmployeeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diversityEmployeeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diversityEmployeeListModification');
      this.activeModal.close();
    });
  }
}
