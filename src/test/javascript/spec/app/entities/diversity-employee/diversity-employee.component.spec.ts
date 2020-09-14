import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityEmployeeComponent } from 'app/entities/diversity-employee/diversity-employee.component';
import { DiversityEmployeeService } from 'app/entities/diversity-employee/diversity-employee.service';
import { DiversityEmployee } from 'app/shared/model/diversity-employee.model';

describe('Component Tests', () => {
  describe('DiversityEmployee Management Component', () => {
    let comp: DiversityEmployeeComponent;
    let fixture: ComponentFixture<DiversityEmployeeComponent>;
    let service: DiversityEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityEmployeeComponent],
      })
        .overrideTemplate(DiversityEmployeeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityEmployeeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityEmployeeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiversityEmployee(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diversityEmployees && comp.diversityEmployees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
