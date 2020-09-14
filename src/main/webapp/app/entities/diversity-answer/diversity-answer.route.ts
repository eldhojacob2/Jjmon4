import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiversityAnswer, DiversityAnswer } from 'app/shared/model/diversity-answer.model';
import { DiversityAnswerService } from './diversity-answer.service';
import { DiversityAnswerComponent } from './diversity-answer.component';
import { DiversityAnswerDetailComponent } from './diversity-answer-detail.component';
import { DiversityAnswerUpdateComponent } from './diversity-answer-update.component';

@Injectable({ providedIn: 'root' })
export class DiversityAnswerResolve implements Resolve<IDiversityAnswer> {
  constructor(private service: DiversityAnswerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiversityAnswer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diversityAnswer: HttpResponse<DiversityAnswer>) => {
          if (diversityAnswer.body) {
            return of(diversityAnswer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiversityAnswer());
  }
}

export const diversityAnswerRoute: Routes = [
  {
    path: '',
    component: DiversityAnswerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityAnswers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiversityAnswerDetailComponent,
    resolve: {
      diversityAnswer: DiversityAnswerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityAnswers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiversityAnswerUpdateComponent,
    resolve: {
      diversityAnswer: DiversityAnswerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityAnswers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiversityAnswerUpdateComponent,
    resolve: {
      diversityAnswer: DiversityAnswerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityAnswers',
    },
    canActivate: [UserRouteAccessService],
  },
];
