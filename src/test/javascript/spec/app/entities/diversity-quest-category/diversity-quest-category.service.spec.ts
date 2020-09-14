import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DiversityQuestCategoryService } from 'app/entities/diversity-quest-category/diversity-quest-category.service';
import { IDiversityQuestCategory, DiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';

describe('Service Tests', () => {
  describe('DiversityQuestCategory Service', () => {
    let injector: TestBed;
    let service: DiversityQuestCategoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiversityQuestCategory;
    let expectedResult: IDiversityQuestCategory | IDiversityQuestCategory[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DiversityQuestCategoryService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DiversityQuestCategory(0, 0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DiversityQuestCategory', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DiversityQuestCategory()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DiversityQuestCategory', () => {
        const returnedFromService = Object.assign(
          {
            categorySeqNo: 1,
            categoryNo: 'BBBBBB',
            categoryDesc: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DiversityQuestCategory', () => {
        const returnedFromService = Object.assign(
          {
            categorySeqNo: 1,
            categoryNo: 'BBBBBB',
            categoryDesc: 'BBBBBB',
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

      it('should delete a DiversityQuestCategory', () => {
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
