import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiversityEmployee } from 'app/shared/model/diversity-employee.model';

type EntityResponseType = HttpResponse<IDiversityEmployee>;
type EntityArrayResponseType = HttpResponse<IDiversityEmployee[]>;

@Injectable({ providedIn: 'root' })
export class DiversityEmployeeService {
  public resourceUrl = SERVER_API_URL + 'api/diversity-employees';

  constructor(protected http: HttpClient) {}

  create(diversityEmployee: IDiversityEmployee): Observable<EntityResponseType> {
    return this.http.post<IDiversityEmployee>(this.resourceUrl, diversityEmployee, { observe: 'response' });
  }

  update(diversityEmployee: IDiversityEmployee): Observable<EntityResponseType> {
    return this.http.put<IDiversityEmployee>(this.resourceUrl, diversityEmployee, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiversityEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiversityEmployee[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
