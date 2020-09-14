import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiversityTheme } from 'app/shared/model/diversity-theme.model';

type EntityResponseType = HttpResponse<IDiversityTheme>;
type EntityArrayResponseType = HttpResponse<IDiversityTheme[]>;

@Injectable({ providedIn: 'root' })
export class DiversityThemeService {
  public resourceUrl = SERVER_API_URL + 'api/diversity-themes';

  constructor(protected http: HttpClient) {}

  create(diversityTheme: IDiversityTheme): Observable<EntityResponseType> {
    return this.http.post<IDiversityTheme>(this.resourceUrl, diversityTheme, { observe: 'response' });
  }

  update(diversityTheme: IDiversityTheme): Observable<EntityResponseType> {
    return this.http.put<IDiversityTheme>(this.resourceUrl, diversityTheme, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiversityTheme>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiversityTheme[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
