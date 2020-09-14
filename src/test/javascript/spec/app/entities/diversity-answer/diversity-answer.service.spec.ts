import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DiversityAnswerService } from 'app/entities/diversity-answer/diversity-answer.service';
import { IDiversityAnswer, DiversityAnswer } from 'app/shared/model/diversity-answer.model';
import { AnswerInputType } from 'app/shared/model/enumerations/answer-input-type.model';

describe('Service Tests', () => {
  describe('DiversityAnswer Service', () => {
    let injector: TestBed;
    let service: DiversityAnswerService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiversityAnswer;
    let expectedResult: IDiversityAnswer | IDiversityAnswer[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DiversityAnswerService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DiversityAnswer(0, 0, AnswerInputType.RADIO, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DiversityAnswer', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DiversityAnswer()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DiversityAnswer', () => {
        const returnedFromService = Object.assign(
          {
            answerSeqNo: 1,
            answerType: 'BBBBBB',
            answerCustomLabel: 'BBBBBB',
            answerDesc: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DiversityAnswer', () => {
        const returnedFromService = Object.assign(
          {
            answerSeqNo: 1,
            answerType: 'BBBBBB',
            answerCustomLabel: 'BBBBBB',
            answerDesc: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DiversityAnswer', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
