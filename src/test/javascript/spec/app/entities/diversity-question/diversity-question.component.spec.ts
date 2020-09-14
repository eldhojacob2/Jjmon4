import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityQuestionComponent } from 'app/entities/diversity-question/diversity-question.component';
import { DiversityQuestionService } from 'app/entities/diversity-question/diversity-question.service';
import { DiversityQuestion } from 'app/shared/model/diversity-question.model';

describe('Component Tests', () => {
  describe('DiversityQuestion Management Component', () => {
    let comp: DiversityQuestionComponent;
    let fixture: ComponentFixture<DiversityQuestionComponent>;
    let service: DiversityQuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityQuestionComponent],
      })
        .overrideTemplate(DiversityQuestionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityQuestionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityQuestionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiversityQuestion(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diversityQuestions && comp.diversityQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
