import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityQuestionUpdateComponent } from 'app/entities/diversity-question/diversity-question-update.component';
import { DiversityQuestionService } from 'app/entities/diversity-question/diversity-question.service';
import { DiversityQuestion } from 'app/shared/model/diversity-question.model';

describe('Component Tests', () => {
  describe('DiversityQuestion Management Update Component', () => {
    let comp: DiversityQuestionUpdateComponent;
    let fixture: ComponentFixture<DiversityQuestionUpdateComponent>;
    let service: DiversityQuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityQuestionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiversityQuestionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityQuestionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityQuestionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiversityQuestion(123);
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
        const entity = new DiversityQuestion();
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
