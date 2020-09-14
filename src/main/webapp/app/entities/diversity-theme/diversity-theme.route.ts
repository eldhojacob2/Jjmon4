import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiversityTheme, DiversityTheme } from 'app/shared/model/diversity-theme.model';
import { DiversityThemeService } from './diversity-theme.service';
import { DiversityThemeComponent } from './diversity-theme.component';
import { DiversityThemeDetailComponent } from './diversity-theme-detail.component';
import { DiversityThemeUpdateComponent } from './diversity-theme-update.component';

@Injectable({ providedIn: 'root' })
export class DiversityThemeResolve implements Resolve<IDiversityTheme> {
  constructor(private service: DiversityThemeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiversityTheme> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diversityTheme: HttpResponse<DiversityTheme>) => {
          if (diversityTheme.body) {
            return of(diversityTheme.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiversityTheme());
  }
}

export const diversityThemeRoute: Routes = [
  {
    path: '',
    component: DiversityThemeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityThemes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiversityThemeDetailComponent,
    resolve: {
      diversityTheme: DiversityThemeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityThemes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiversityThemeUpdateComponent,
    resolve: {
      diversityTheme: DiversityThemeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityThemes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiversityThemeUpdateComponent,
    resolve: {
      diversityTheme: DiversityThemeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityThemes',
    },
    canActivate: [UserRouteAccessService],
  },
];
