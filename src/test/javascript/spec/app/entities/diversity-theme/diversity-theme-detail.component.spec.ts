import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityThemeDetailComponent } from 'app/entities/diversity-theme/diversity-theme-detail.component';
import { DiversityTheme } from 'app/shared/model/diversity-theme.model';

describe('Component Tests', () => {
  describe('DiversityTheme Management Detail Component', () => {
    let comp: DiversityThemeDetailComponent;
    let fixture: ComponentFixture<DiversityThemeDetailComponent>;
    const route = ({ data: of({ diversityTheme: new DiversityTheme(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityThemeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiversityThemeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiversityThemeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diversityTheme on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diversityTheme).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
