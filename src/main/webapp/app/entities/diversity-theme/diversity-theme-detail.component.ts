import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiversityTheme } from 'app/shared/model/diversity-theme.model';

@Component({
  selector: 'jhi-diversity-theme-detail',
  templateUrl: './diversity-theme-detail.component.html',
})
export class DiversityThemeDetailComponent implements OnInit {
  diversityTheme: IDiversityTheme | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityTheme }) => (this.diversityTheme = diversityTheme));
  }

  previousState(): void {
    window.history.back();
  }
}
