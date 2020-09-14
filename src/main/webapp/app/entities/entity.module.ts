import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'diversity-theme',
        loadChildren: () => import('./diversity-theme/diversity-theme.module').then(m => m.JjApp4DiversityThemeModule),
      },
      {
        path: 'diversity-question',
        loadChildren: () => import('./diversity-question/diversity-question.module').then(m => m.JjApp4DiversityQuestionModule),
      },
      {
        path: 'diversity-quest-category',
        loadChildren: () =>
          import('./diversity-quest-category/diversity-quest-category.module').then(m => m.JjApp4DiversityQuestCategoryModule),
      },
      {
        path: 'diversity-answer',
        loadChildren: () => import('./diversity-answer/diversity-answer.module').then(m => m.JjApp4DiversityAnswerModule),
      },
      {
        path: 'diversity-survey-data',
        loadChildren: () => import('./diversity-survey-data/diversity-survey-data.module').then(m => m.JjApp4DiversitySurveyDataModule),
      },
      {
        path: 'diversity-employee',
        loadChildren: () => import('./diversity-employee/diversity-employee.module').then(m => m.JjApp4DiversityEmployeeModule),
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.JjApp4RolesModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JjApp4EntityModule {}
