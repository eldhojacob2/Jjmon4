import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';

type EntityResponseType = HttpResponse<IDiversityQuestCategory>;
type EntityArrayResponseType = HttpResponse<IDiversityQuestCategory[]>;

@Injectable({ providedIn: 'root' })
export class DiversityQuestCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/diversity-quest-categories';

  constructor(protected http: HttpClient) {}

  create(diversityQuestCategory: IDiversityQuestCategory): Observable<EntityResponseType> {
    return this.http.post<IDiversityQuestCategory>(this.resourceUrl, diversityQuestCategory, { observe: 'response' });
  }

  update(diversityQuestCategory: IDiversityQuestCategory): Observable<EntityResponseType> {
    return this.http.put<IDiversityQuestCategory>(this.resourceUrl, diversityQuestCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiversityQuestCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiversityQuestCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
