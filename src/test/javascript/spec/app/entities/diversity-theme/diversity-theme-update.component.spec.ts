import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityThemeUpdateComponent } from 'app/entities/diversity-theme/diversity-theme-update.component';
import { DiversityThemeService } from 'app/entities/diversity-theme/diversity-theme.service';
import { DiversityTheme } from 'app/shared/model/diversity-theme.model';

describe('Component Tests', () => {
  describe('DiversityTheme Management Update Component', () => {
    let comp: DiversityThemeUpdateComponent;
    let fixture: ComponentFixture<DiversityThemeUpdateComponent>;
    let service: DiversityThemeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityThemeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiversityThemeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityThemeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityThemeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiversityTheme(123);
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
        const entity = new DiversityTheme();
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
