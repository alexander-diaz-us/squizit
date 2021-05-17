interface DonateButton {
  name: string;
  icon: string;
  href: string;
}

export interface SquizitInfo {
  ads: string[];
  info: string;
  address: DonateButton[];
  donates: {
    donators: {
      name: string;
      amount: number;
      note: string;
    }[];
    amount: number;
    target: number;
  };
}

export enum QuestionType {
  MultipleChoice = "MCQ",
  Checkbox = "MSQ",
  Blank = "BLANK",
  OpenEnded = "OPEN",
}

export interface AnswersResponse {
  ok: boolean;
  message: string;
  version: string;
  answers: Answer[] | null;
}

interface Media {
  url: string;
}

export interface Answer {
  type: QuestionType;
  answer: {
    answer: number;
    options: {
      hasMath: boolean;
      math: {
        latex: unknown[];
        template: string;
      };
      media: Media[];
      text: string;
      type: string;
    }[];
  };
  structure: {
    query: {
      hasMath: boolean;
      math: {
        latex: unknown[];
        template: string;
      };
      media: Media[];
      text: string;
      type: string;
    };

    options: {
      hasMath: boolean;
      math: {
        latex: unknown[];
        template: string;
      };
      media: Media[];
      text: string;
      type: string;
    }[];

    hasMath: boolean;

    kind: QuestionType;
    settings: {
      hasCorrectAnswer: boolean;
    };
  };
  _id: string;
}

export interface FormattedAnswer {
  type: QuestionType;
  question: FormattedObject;
  answers: FormattedObject[];
}

export interface FormattedObject {
  text: string;
  image: string;
}
