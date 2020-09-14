import { IDiversityTheme } from 'app/shared/model/diversity-theme.model';

export interface IDiversityQuestion {
  id?: number;
  questionSeqNo?: number;
  questionNo?: string;
  questionDesc?: string;
  theme?: IDiversityTheme;
}

export class DiversityQuestion implements IDiversityQuestion {
  constructor(
    public id?: number,
    public questionSeqNo?: number,
    public questionNo?: string,
    public questionDesc?: string,
    public theme?: IDiversityTheme
  ) {}
}
