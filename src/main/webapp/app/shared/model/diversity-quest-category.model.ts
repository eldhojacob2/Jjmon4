import { IDiversityQuestion } from 'app/shared/model/diversity-question.model';

export interface IDiversityQuestCategory {
  id?: number;
  categorySeqNo?: number;
  categoryNo?: string;
  categoryDesc?: string;
  question?: IDiversityQuestion;
}

export class DiversityQuestCategory implements IDiversityQuestCategory {
  constructor(
    public id?: number,
    public categorySeqNo?: number,
    public categoryNo?: string,
    public categoryDesc?: string,
    public question?: IDiversityQuestion
  ) {}
}
