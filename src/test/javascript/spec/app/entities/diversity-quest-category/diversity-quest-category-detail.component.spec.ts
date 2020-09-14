import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityQuestCategoryDetailComponent } from 'app/entities/diversity-quest-category/diversity-quest-category-detail.component';
import { DiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';

describe('Component Tests', () => {
  describe('DiversityQuestCategory Management Detail Component', () => {
    let comp: DiversityQuestCategoryDetailComponent;
    let fixture: ComponentFixture<DiversityQuestCategoryDetailComponent>;
    const route = ({ data: of({ diversityQuestCategory: new DiversityQuestCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityQuestCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiversityQuestCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiversityQuestCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diversityQuestCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diversityQuestCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
