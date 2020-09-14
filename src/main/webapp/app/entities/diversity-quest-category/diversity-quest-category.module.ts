import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JjApp4SharedModule } from 'app/shared/shared.module';
import { DiversityQuestCategoryComponent } from './diversity-quest-category.component';
import { DiversityQuestCategoryDetailComponent } from './diversity-quest-category-detail.component';
import { DiversityQuestCategoryUpdateComponent } from './diversity-quest-category-update.component';
import { DiversityQuestCategoryDeleteDialogComponent } from './diversity-quest-category-delete-dialog.component';
import { diversityQuestCategoryRoute } from './diversity-quest-category.route';

@NgModule({
  imports: [JjApp4SharedModule, RouterModule.forChild(diversityQuestCategoryRoute)],
  declarations: [
    DiversityQuestCategoryComponent,
    DiversityQuestCategoryDetailComponent,
    DiversityQuestCategoryUpdateComponent,
    DiversityQuestCategoryDeleteDialogComponent,
  ],
  entryComponents: [DiversityQuestCategoryDeleteDialogComponent],
})
export class JjApp4DiversityQuestCategoryModule {}
