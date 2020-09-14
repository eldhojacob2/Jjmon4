import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityThemeComponent } from 'app/entities/diversity-theme/diversity-theme.component';
import { DiversityThemeService } from 'app/entities/diversity-theme/diversity-theme.service';
import { DiversityTheme } from 'app/shared/model/diversity-theme.model';

describe('Component Tests', () => {
  describe('DiversityTheme Management Component', () => {
    let comp: DiversityThemeComponent;
    let fixture: ComponentFixture<DiversityThemeComponent>;
    let service: DiversityThemeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityThemeComponent],
      })
        .overrideTemplate(DiversityThemeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityThemeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityThemeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiversityTheme(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diversityThemes && comp.diversityThemes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
