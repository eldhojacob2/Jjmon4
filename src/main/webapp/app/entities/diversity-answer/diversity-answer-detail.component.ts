import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiversityAnswer } from 'app/shared/model/diversity-answer.model';

@Component({
  selector: 'jhi-diversity-answer-detail',
  templateUrl: './diversity-answer-detail.component.html',
})
export class DiversityAnswerDetailComponent implements OnInit {
  diversityAnswer: IDiversityAnswer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityAnswer }) => (this.diversityAnswer = diversityAnswer));
  }

  previousState(): void {
    window.history.back();
  }
}
