import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiversitySurveyData, DiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';
import { DiversitySurveyDataService } from './diversity-survey-data.service';
import { DiversitySurveyDataComponent } from './diversity-survey-data.component';
import { DiversitySurveyDataDetailComponent } from './diversity-survey-data-detail.component';
import { DiversitySurveyDataUpdateComponent } from './diversity-survey-data-update.component';

@Injectable({ providedIn: 'root' })
export class DiversitySurveyDataResolve implements Resolve<IDiversitySurveyData> {
  constructor(private service: DiversitySurveyDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiversitySurveyData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diversitySurveyData: HttpResponse<DiversitySurveyData>) => {
          if (diversitySurveyData.body) {
            return of(diversitySurveyData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiversitySurveyData());
  }
}

export const diversitySurveyDataRoute: Routes = [
  {
    path: '',
    component: DiversitySurveyDataComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversitySurveyData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiversitySurveyDataDetailComponent,
    resolve: {
      diversitySurveyData: DiversitySurveyDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversitySurveyData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiversitySurveyDataUpdateComponent,
    resolve: {
      diversitySurveyData: DiversitySurveyDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversitySurveyData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiversitySurveyDataUpdateComponent,
    resolve: {
      diversitySurveyData: DiversitySurveyDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversitySurveyData',
    },
    canActivate: [UserRouteAccessService],
  },
];
