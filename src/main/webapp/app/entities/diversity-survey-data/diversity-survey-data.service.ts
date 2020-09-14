import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';

type EntityResponseType = HttpResponse<IDiversitySurveyData>;
type EntityArrayResponseType = HttpResponse<IDiversitySurveyData[]>;

@Injectable({ providedIn: 'root' })
export class DiversitySurveyDataService {
  public resourceUrl = SERVER_API_URL + 'api/diversity-survey-data';

  constructor(protected http: HttpClient) {}

  create(diversitySurveyData: IDiversitySurveyData): Observable<EntityResponseType> {
    return this.http.post<IDiversitySurveyData>(this.resourceUrl, diversitySurveyData, { observe: 'response' });
  }

  update(diversitySurveyData: IDiversitySurveyData): Observable<EntityResponseType> {
    return this.http.put<IDiversitySurveyData>(this.resourceUrl, diversitySurveyData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiversitySurveyData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiversitySurveyData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
