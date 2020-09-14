import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';

@Component({
  selector: 'jhi-diversity-question-detail',
  templateUrl: './diversity-question-detail.component.html',
})
export class DiversityQuestionDetailComponent implements OnInit {
  diversityQuestion: IDiversityQuestion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityQuestion }) => (this.diversityQuestion = diversityQuestion));
  }

  previousState(): void {
    window.history.back();
  }
}
