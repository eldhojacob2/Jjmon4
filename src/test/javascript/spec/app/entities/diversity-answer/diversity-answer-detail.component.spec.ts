import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityAnswerDetailComponent } from 'app/entities/diversity-answer/diversity-answer-detail.component';
import { DiversityAnswer } from 'app/shared/model/diversity-answer.model';

describe('Component Tests', () => {
  describe('DiversityAnswer Management Detail Component', () => {
    let comp: DiversityAnswerDetailComponent;
    let fixture: ComponentFixture<DiversityAnswerDetailComponent>;
    const route = ({ data: of({ diversityAnswer: new DiversityAnswer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityAnswerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiversityAnswerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiversityAnswerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diversityAnswer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diversityAnswer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
