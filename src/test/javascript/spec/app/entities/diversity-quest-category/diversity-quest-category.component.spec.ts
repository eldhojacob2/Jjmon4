import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityQuestCategoryComponent } from 'app/entities/diversity-quest-category/diversity-quest-category.component';
import { DiversityQuestCategoryService } from 'app/entities/diversity-quest-category/diversity-quest-category.service';
import { DiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';

describe('Component Tests', () => {
  describe('DiversityQuestCategory Management Component', () => {
    let comp: DiversityQuestCategoryComponent;
    let fixture: ComponentFixture<DiversityQuestCategoryComponent>;
    let service: DiversityQuestCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityQuestCategoryComponent],
      })
        .overrideTemplate(DiversityQuestCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityQuestCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityQuestCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiversityQuestCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diversityQuestCategories && comp.diversityQuestCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
