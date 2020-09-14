import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiversityEmployee } from 'app/shared/model/diversity-employee.model';
import { DiversityEmployeeService } from './diversity-employee.service';
import { DiversityEmployeeDeleteDialogComponent } from './diversity-employee-delete-dialog.component';

@Component({
  selector: 'jhi-diversity-employee',
  templateUrl: './diversity-employee.component.html',
})
export class DiversityEmployeeComponent implements OnInit, OnDestroy {
  diversityEmployees?: IDiversityEmployee[];
  eventSubscriber?: Subscription;

  constructor(
    protected diversityEmployeeService: DiversityEmployeeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.diversityEmployeeService
      .query()
      .subscribe((res: HttpResponse<IDiversityEmployee[]>) => (this.diversityEmployees = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiversityEmployees();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiversityEmployee): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiversityEmployees(): void {
    this.eventSubscriber = this.eventManager.subscribe('diversityEmployeeListModification', () => this.loadAll());
  }

  delete(diversityEmployee: IDiversityEmployee): void {
    const modalRef = this.modalService.open(DiversityEmployeeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diversityEmployee = diversityEmployee;
  }
}
