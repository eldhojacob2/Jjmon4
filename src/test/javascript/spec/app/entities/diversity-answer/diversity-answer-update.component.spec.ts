import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityAnswerUpdateComponent } from 'app/entities/diversity-answer/diversity-answer-update.component';
import { DiversityAnswerService } from 'app/entities/diversity-answer/diversity-answer.service';
import { DiversityAnswer } from 'app/shared/model/diversity-answer.model';

describe('Component Tests', () => {
  describe('DiversityAnswer Management Update Component', () => {
    let comp: DiversityAnswerUpdateComponent;
    let fixture: ComponentFixture<DiversityAnswerUpdateComponent>;
    let service: DiversityAnswerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityAnswerUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiversityAnswerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityAnswerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityAnswerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiversityAnswer(123);
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
        const entity = new DiversityAnswer();
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
