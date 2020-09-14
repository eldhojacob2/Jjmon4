import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';

type EntityResponseType = HttpResponse<IDiversityQuestion>;
type EntityArrayResponseType = HttpResponse<IDiversityQuestion[]>;

@Injectable({ providedIn: 'root' })
export class DiversityQuestionService {
  public resourceUrl = SERVER_API_URL + 'api/diversity-questions';

  constructor(protected http: HttpClient) {}

  create(diversityQuestion: IDiversityQuestion): Observable<EntityResponseType> {
    return this.http.post<IDiversityQuestion>(this.resourceUrl, diversityQuestion, { observe: 'response' });
  }

  update(diversityQuestion: IDiversityQuestion): Observable<EntityResponseType> {
    return this.http.put<IDiversityQuestion>(this.resourceUrl, diversityQuestion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiversityQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiversityQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
