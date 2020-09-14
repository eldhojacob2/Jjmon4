import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiversityEmployee, DiversityEmployee } from 'app/shared/model/diversity-employee.model';
import { DiversityEmployeeService } from './diversity-employee.service';
import { DiversityEmployeeComponent } from './diversity-employee.component';
import { DiversityEmployeeDetailComponent } from './diversity-employee-detail.component';
import { DiversityEmployeeUpdateComponent } from './diversity-employee-update.component';

@Injectable({ providedIn: 'root' })
export class DiversityEmployeeResolve implements Resolve<IDiversityEmployee> {
  constructor(private service: DiversityEmployeeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiversityEmployee> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diversityEmployee: HttpResponse<DiversityEmployee>) => {
          if (diversityEmployee.body) {
            return of(diversityEmployee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiversityEmployee());
  }
}

export const diversityEmployeeRoute: Routes = [
  {
    path: '',
    component: DiversityEmployeeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityEmployees',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiversityEmployeeDetailComponent,
    resolve: {
      diversityEmployee: DiversityEmployeeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityEmployees',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiversityEmployeeUpdateComponent,
    resolve: {
      diversityEmployee: DiversityEmployeeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityEmployees',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiversityEmployeeUpdateComponent,
    resolve: {
      diversityEmployee: DiversityEmployeeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DiversityEmployees',
    },
    canActivate: [UserRouteAccessService],
  },
];
