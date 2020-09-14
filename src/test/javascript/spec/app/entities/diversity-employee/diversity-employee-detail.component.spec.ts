import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityEmployeeDetailComponent } from 'app/entities/diversity-employee/diversity-employee-detail.component';
import { DiversityEmployee } from 'app/shared/model/diversity-employee.model';

describe('Component Tests', () => {
  describe('DiversityEmployee Management Detail Component', () => {
    let comp: DiversityEmployeeDetailComponent;
    let fixture: ComponentFixture<DiversityEmployeeDetailComponent>;
    const route = ({ data: of({ diversityEmployee: new DiversityEmployee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityEmployeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiversityEmployeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiversityEmployeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diversityEmployee on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diversityEmployee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
