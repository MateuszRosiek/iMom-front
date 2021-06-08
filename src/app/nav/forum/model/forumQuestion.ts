import {Answer} from './answer';

export interface ForumQuestion {
  id: number;
  questionTitle: string;
  question: string;
  author: string;
  likesQuantity: number;
  date: string;
  forumAnswer: Answer[];
}
