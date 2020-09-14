import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JjApp4SharedModule } from 'app/shared/shared.module';
import { DiversityEmployeeComponent } from './diversity-employee.component';
import { DiversityEmployeeDetailComponent } from './diversity-employee-detail.component';
import { DiversityEmployeeUpdateComponent } from './diversity-employee-update.component';
import { DiversityEmployeeDeleteDialogComponent } from './diversity-employee-delete-dialog.component';
import { diversityEmployeeRoute } from './diversity-employee.route';

@NgModule({
  imports: [JjApp4SharedModule, RouterModule.forChild(diversityEmployeeRoute)],
  declarations: [
    DiversityEmployeeComponent,
    DiversityEmployeeDetailComponent,
    DiversityEmployeeUpdateComponent,
    DiversityEmployeeDeleteDialogComponent,
  ],
  entryComponents: [DiversityEmployeeDeleteDialogComponent],
})
export class JjApp4DiversityEmployeeModule {}
