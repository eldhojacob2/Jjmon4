import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversitySurveyDataDetailComponent } from 'app/entities/diversity-survey-data/diversity-survey-data-detail.component';
import { DiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';

describe('Component Tests', () => {
  describe('DiversitySurveyData Management Detail Component', () => {
    let comp: DiversitySurveyDataDetailComponent;
    let fixture: ComponentFixture<DiversitySurveyDataDetailComponent>;
    const route = ({ data: of({ diversitySurveyData: new DiversitySurveyData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversitySurveyDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiversitySurveyDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiversitySurveyDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diversitySurveyData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diversitySurveyData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
