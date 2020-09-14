import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JjApp4TestModule } from '../../../test.module';
import { DiversitySurveyDataComponent } from 'app/entities/diversity-survey-data/diversity-survey-data.component';
import { DiversitySurveyDataService } from 'app/entities/diversity-survey-data/diversity-survey-data.service';
import { DiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';

describe('Component Tests', () => {
  describe('DiversitySurveyData Management Component', () => {
    let comp: DiversitySurveyDataComponent;
    let fixture: ComponentFixture<DiversitySurveyDataComponent>;
    let service: DiversitySurveyDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversitySurveyDataComponent],
      })
        .overrideTemplate(DiversitySurveyDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversitySurveyDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversitySurveyDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiversitySurveyData(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diversitySurveyData && comp.diversitySurveyData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
