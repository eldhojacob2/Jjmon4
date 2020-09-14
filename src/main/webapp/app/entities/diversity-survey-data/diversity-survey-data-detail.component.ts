import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';

@Component({
  selector: 'jhi-diversity-survey-data-detail',
  templateUrl: './diversity-survey-data-detail.component.html',
})
export class DiversitySurveyDataDetailComponent implements OnInit {
  diversitySurveyData: IDiversitySurveyData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversitySurveyData }) => (this.diversitySurveyData = diversitySurveyData));
  }

  previousState(): void {
    window.history.back();
  }
}
