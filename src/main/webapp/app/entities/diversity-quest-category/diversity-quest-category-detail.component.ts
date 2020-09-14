import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';

@Component({
  selector: 'jhi-diversity-quest-category-detail',
  templateUrl: './diversity-quest-category-detail.component.html',
})
export class DiversityQuestCategoryDetailComponent implements OnInit {
  diversityQuestCategory: IDiversityQuestCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diversityQuestCategory }) => (this.diversityQuestCategory = diversityQuestCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
