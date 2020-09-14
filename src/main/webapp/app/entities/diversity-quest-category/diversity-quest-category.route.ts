import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiversityQuestCategory, DiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';
import { DiversityQuestCategoryService } from './diversity-quest-category.service';
import { DiversityQuestCategoryComponent } from './diversity-quest-category.component';
import { DiversityQuestCategoryDetailComponent } from './diversity-quest-category-detail.component';
import { DiversityQuestCategoryUpdateComponent } from './diversity-quest-category-update.component';

@Injectable({ providedIn: 'root' })
export class DiversityQuestCategoryResolve implements Resolve<IDiversityQuestCategory> {
  constructor(private service: DiversityQuestCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiversityQuestCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diversityQuestCategory: HttpResponse<DiversityQuestCategory>) => {
          if (diversityQuestCategory.body) {
            return of(diversityQuestCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiversityQuestCategory());
  }
}

export const diversityQuestCategoryRoute: Routes = [
  {
    path: '',
    component: DiversityQuestCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestCategories',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiversityQuestCategoryDetailComponent,
    resolve: {
      diversityQuestCategory: DiversityQuestCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestCategories',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiversityQuestCategoryUpdateComponent,
    resolve: {
      diversityQuestCategory: DiversityQuestCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestCategories',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiversityQuestCategoryUpdateComponent,
    resolve: {
      diversityQuestCategory: DiversityQuestCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityQuestCategories',
    },
    canActivate: [UserRouteAccessService],
  },
];
