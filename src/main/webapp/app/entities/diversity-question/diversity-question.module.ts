import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JjApp4SharedModule } from 'app/shared/shared.module';
import { DiversityQuestionComponent } from './diversity-question.component';
import { DiversityQuestionDetailComponent } from './diversity-question-detail.component';
import { DiversityQuestionUpdateComponent } from './diversity-question-update.component';
import { DiversityQuestionDeleteDialogComponent } from './diversity-question-delete-dialog.component';
import { diversityQuestionRoute } from './diversity-question.route';

@NgModule({
  imports: [JjApp4SharedModule, RouterModule.forChild(diversityQuestionRoute)],
  declarations: [
    DiversityQuestionComponent,
    DiversityQuestionDetailComponent,
    DiversityQuestionUpdateComponent,
    DiversityQuestionDeleteDialogComponent,
  ],
  entryComponents: [DiversityQuestionDeleteDialogComponent],
})
export class JjApp4DiversityQuestionModule {}
