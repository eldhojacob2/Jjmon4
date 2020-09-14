import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiversityTheme } from 'app/shared/model/diversity-theme.model';
import { DiversityThemeService } from './diversity-theme.service';

@Component({
  templateUrl: './diversity-theme-delete-dialog.component.html',
})
export class DiversityThemeDeleteDialogComponent {
  diversityTheme?: IDiversityTheme;

  constructor(
    protected diversityThemeService: DiversityThemeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diversityThemeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diversityThemeListModification');
      this.activeModal.close();
    });
  }
}
