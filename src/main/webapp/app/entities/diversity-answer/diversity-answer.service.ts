import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiversityAnswer } from 'app/shared/model/diversity-answer.model';

type EntityResponseType = HttpResponse<IDiversityAnswer>;
type EntityArrayResponseType = HttpResponse<IDiversityAnswer[]>;

@Injectable({ providedIn: 'root' })
export class DiversityAnswerService {
  public resourceUrl = SERVER_API_URL + 'api/diversity-answers';

  constructor(protected http: HttpClient) {}

  create(diversityAnswer: IDiversityAnswer): Observable<EntityResponseType> {
    return this.http.post<IDiversityAnswer>(this.resourceUrl, diversityAnswer, { observe: 'response' });
  }

  update(diversityAnswer: IDiversityAnswer): Observable<EntityResponseType> {
    return this.http.put<IDiversityAnswer>(this.resourceUrl, diversityAnswer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiversityAnswer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiversityAnswer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
