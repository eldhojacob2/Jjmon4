import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';
import { IDiversityQuestCategory } from 'app/shared/model/diversity-quest-category.model';
import { AnswerInputType } from 'app/shared/model/enumerations/answer-input-type.model';

export interface IDiversityAnswer {
  id?: number;
  answerSeqNo?: number;
  answerType?: AnswerInputType;
  answerCustomLabel?: string;
  answerDesc?: string;
  question?: IDiversityQuestion;
  questCategory?: IDiversityQuestCategory;
}

export class DiversityAnswer implements IDiversityAnswer {
  constructor(
    public id?: number,
    public answerSeqNo?: number,
    public answerType?: AnswerInputType,
    public answerCustomLabel?: string,
    public answerDesc?: string,
    public question?: IDiversityQuestion,
    public questCategory?: IDiversityQuestCategory
  ) {}
}
