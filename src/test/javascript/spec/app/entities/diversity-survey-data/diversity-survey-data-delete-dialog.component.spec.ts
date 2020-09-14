import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JjApp4TestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { DiversitySurveyDataDeleteDialogComponent } from 'app/entities/diversity-survey-data/diversity-survey-data-delete-dialog.component';
import { DiversitySurveyDataService } from 'app/entities/diversity-survey-data/diversity-survey-data.service';

describe('Component Tests', () => {
  describe('DiversitySurveyData Management Delete Component', () => {
    let comp: DiversitySurveyDataDeleteDialogComponent;
    let fixture: ComponentFixture<DiversitySurveyDataDeleteDialogComponent>;
    let service: DiversitySurveyDataService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JjApp4TestModule],
        declarations: [DiversitySurveyDataDeleteDialogComponent],
      })
        .overrideTemplate(DiversitySurveyDataDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiversitySurveyDataDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiversitySurveyDataService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
