import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JjApp4SharedModule } from 'app/shared/shared.module';
import { DiversityAnswerComponent } from './diversity-answer.component';
import { DiversityAnswerDetailComponent } from './diversity-answer-detail.component';
import { DiversityAnswerUpdateComponent } from './diversity-answer-update.component';
import { DiversityAnswerDeleteDialogComponent } from './diversity-answer-delete-dialog.component';
import { diversityAnswerRoute } from './diversity-answer.route';

@NgModule({
  imports: [JjApp4SharedModule, RouterModule.forChild(diversityAnswerRoute)],
  declarations: [
    DiversityAnswerComponent,
    DiversityAnswerDetailComponent,
    DiversityAnswerUpdateComponent,
    DiversityAnswerDeleteDialogComponent,
  ],
  entryComponents: [DiversityAnswerDeleteDialogComponent],
})
export class JjApp4DiversityAnswerModule {}
