import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JjApp4SharedModule } from 'app/shared/shared.module';
import { DiversitySurveyDataComponent } from './diversity-survey-data.component';
import { DiversitySurveyDataDetailComponent } from './diversity-survey-data-detail.component';
import { DiversitySurveyDataUpdateComponent } from './diversity-survey-data-update.component';
import { DiversitySurveyDataDeleteDialogComponent } from './diversity-survey-data-delete-dialog.component';
import { diversitySurveyDataRoute } from './diversity-survey-data.route';

@NgModule({
  imports: [JjApp4SharedModule, RouterModule.forChild(diversitySurveyDataRoute)],
  declarations: [
    DiversitySurveyDataComponent,
    DiversitySurveyDataDetailComponent,
    DiversitySurveyDataUpdateComponent,
    DiversitySurveyDataDeleteDialogComponent,
  ],
  entryComponents: [DiversitySurveyDataDeleteDialogComponent],
})
export class JjApp4DiversitySurveyDataModule {}
