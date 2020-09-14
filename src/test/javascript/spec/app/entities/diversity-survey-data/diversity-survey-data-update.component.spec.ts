import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversitySurveyDataUpdateComponent } from 'app/entities/diversity-survey-data/diversity-survey-data-update.component';
import { DiversitySurveyDataService } from 'app/entities/diversity-survey-data/diversity-survey-data.service';
import { DiversitySurveyData } from 'app/shared/model/diversity-survey-data.model';

describe('Component Tests', () => {
  describe('DiversitySurveyData Management Update Component', () => {
    let comp: DiversitySurveyDataUpdateComponent;
    let fixture: ComponentFixture<DiversitySurveyDataUpdateComponent>;
    let service: DiversitySurveyDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversitySurveyDataUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiversitySurveyDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversitySurveyDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversitySurveyDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiversitySurveyData(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiversitySurveyData();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
