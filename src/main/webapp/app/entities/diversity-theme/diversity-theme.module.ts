import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JjApp4SharedModule } from 'app/shared/shared.module';
import { DiversityThemeComponent } from './diversity-theme.component';
import { DiversityThemeDetailComponent } from './diversity-theme-detail.component';
import { DiversityThemeUpdateComponent } from './diversity-theme-update.component';
import { DiversityThemeDeleteDialogComponent } from './diversity-theme-delete-dialog.component';
import { diversityThemeRoute } from './diversity-theme.route';

@NgModule({
  imports: [JjApp4SharedModule, RouterModule.forChild(diversityThemeRoute)],
  declarations: [
    DiversityThemeComponent,
    DiversityThemeDetailComponent,
    DiversityThemeUpdateComponent,
    DiversityThemeDeleteDialogComponent,
  ],
  entryComponents: [DiversityThemeDeleteDialogComponent],
})
export class JjApp4DiversityThemeModule {}
