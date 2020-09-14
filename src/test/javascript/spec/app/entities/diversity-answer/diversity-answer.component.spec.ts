import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JjApp4TestModule } from '../../../test.module';
import { DiversityAnswerComponent } from 'app/entities/diversity-answer/diversity-answer.component';
import { DiversityAnswerService } from 'app/entities/diversity-answer/diversity-answer.service';
import { DiversityAnswer } from 'app/shared/model/diversity-answer.model';

describe('Component Tests', () => {
  describe('DiversityAnswer Management Component', () => {
    let comp: DiversityAnswerComponent;
    let fixture: ComponentFixture<DiversityAnswerComponent>;
    let service: DiversityAnswerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversityAnswerComponent],
      })
        .overrideTemplate(DiversityAnswerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiversityAnswerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversityAnswerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiversityAnswer(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diversityAnswers && comp.diversityAnswers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
