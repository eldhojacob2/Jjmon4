import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityQuestCategoryUpdateComponent } from 'app/entities/diversity-quest-category/diversity-quest-category-update.component';
import { DiversityQuestCategoryService } from 'app/entities/diversity-quest-category/diversity-quest-category.service';
import { DiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';

describe('Component Tests', () => {
  describe('DiversityQuestCategory Management Update Component', () => {
    let comp: DiversityQuestCategoryUpdateComponent;
    let fixture: ComponentFixture<DiversityQuestCategoryUpdateComponent>;
    let service: DiversityQuestCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityQuestCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiversityQuestCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityQuestCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityQuestCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiversityQuestCategory(123);
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
        const entity = new DiversityQuestCategory();
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
