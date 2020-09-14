import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiversityQuestion, DiversityQuestion } from 'app/shared/model/diversity-question.model';
import { DiversityQuestionService } from './diversity-question.service';
import { DiversityQuestionComponent } from './diversity-question.component';
import { DiversityQuestionDetailComponent } from './diversity-question-detail.component';
import { DiversityQuestionUpdateComponent } from './diversity-question-update.component';

@Injectable({ providedIn: 'root' })
export class DiversityQuestionResolve implements Resolve<IDiversityQuestion> {
  constructor(private service: DiversityQuestionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiversityQuestion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diversityQuestion: HttpResponse<DiversityQuestion>) => {
          if (diversityQuestion.body) {
            return of(diversityQuestion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiversityQuestion());
  }
}

export const diversityQuestionRoute: Routes = [
  {
    path: '',
    component: DiversityQuestionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiversityQuestionDetailComponent,
    resolve: {
      diversityQuestion: DiversityQuestionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiversityQuestionUpdateComponent,
    resolve: {
      diversityQuestion: DiversityQuestionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiversityQuestionUpdateComponent,
    resolve: {
      diversityQuestion: DiversityQuestionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestions',
    },
    canActivate: [UserRouteAccessService],
  },
];
