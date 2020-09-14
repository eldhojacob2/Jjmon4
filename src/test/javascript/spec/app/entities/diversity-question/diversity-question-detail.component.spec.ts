import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityQuestionDetailComponent } from 'app/entities/diversity-question/diversity-question-detail.component';
import { DiversityQuestion } from 'app/shared/model/diversity-question.model';

describe('Component Tests', () => {
  describe('DiversityQuestion Management Detail Component', () => {
    let comp: DiversityQuestionDetailComponent;
    let fixture: ComponentFixture<DiversityQuestionDetailComponent>;
    const route = ({ data: of({ diversityQuestion: new DiversityQuestion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityQuestionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiversityQuestionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiversityQuestionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diversityQuestion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diversityQuestion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
