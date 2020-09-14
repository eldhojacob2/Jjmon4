import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiversityTheme } from 'app/shared/model/diversity-theme.model';
import { DiversityThemeService } from './diversity-theme.service';
import { DiversityThemeDeleteDialogComponent } from './diversity-theme-delete-dialog.component';

@Component({
  selector: 'jhi-diversity-theme',
  templateUrl: './diversity-theme.component.html',
})
export class DiversityThemeComponent implements OnInit, OnDestroy {
  diversityThemes?: IDiversityTheme[];
  eventSubscriber?: Subscription;

  constructor(
    protected diversityThemeService: DiversityThemeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.diversityThemeService.query().subscribe((res: HttpResponse<IDiversityTheme[]>) => (this.diversityThemes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiversityThemes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiversityTheme): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiversityThemes(): void {
    this.eventSubscriber = this.eventManager.subscribe('diversityThemeListModification', () => this.loadAll());
  }

  delete(diversityTheme: IDiversityTheme): void {
    const modalRef = this.modalService.open(DiversityThemeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diversityTheme = diversityTheme;
  }
}
