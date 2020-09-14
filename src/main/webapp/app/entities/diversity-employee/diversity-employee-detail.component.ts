import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiversityEmployee } from 'app/shared/model/diversity-employee.model';

@Component({
  selector: 'jhi-diversity-employee-detail',
  templateUrl: './diversity-employee-detail.component.html',
})
export class DiversityEmployeeDetailComponent implements OnInit {
  diversityEmployee: IDiversityEmployee | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityEmployee }) => (this.diversityEmployee = diversityEmployee));
  }

  previousState(): void {
    window.history.back();
  }
}
