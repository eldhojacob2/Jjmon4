import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityEmployeeUpdateComponent } from 'app/entities/diversity-employee/diversity-employee-update.component';
import { DiversityEmployeeService } from 'app/entities/diversity-employee/diversity-employee.service';
import { DiversityEmployee } from 'app/shared/model/diversity-employee.model';

describe('Component Tests', () => {
  describe('DiversityEmployee Management Update Component', () => {
    let comp: DiversityEmployeeUpdateComponent;
    let fixture: ComponentFixture<DiversityEmployeeUpdateComponent>;
    let service: DiversityEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityEmployeeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiversityEmployeeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityEmployeeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityEmployeeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiversityEmployee(123);
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
        const entity = new DiversityEmployee();
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
