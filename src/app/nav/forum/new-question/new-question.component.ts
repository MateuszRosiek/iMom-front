import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {newQuestion} from '../model/newQuestion';
import {ForumService} from '../service/forum.service';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TokenStorageService} from '../../../_services/token-storage.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  public newQuestion: any;
  public formSubmitted: boolean;
  questionForm = new FormGroup({
    questionTitle: new FormControl(''),
    question: new FormControl(''),

  });

  constructor(private forumService: ForumService, private tokenStorage: TokenStorageService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formSubmitted = false;
}

  ngOnInit(): void {
    }

  submitted(): void {
    this.formSubmitted = true;
    // tslint:disable-next-line:label-position
    // tslint:disable-next-line:forin
    let question: newQuestion;
    for (const field in this.questionForm.controls) {
      // tslint:disable-next-line:prefer-const
      question = {
        userId: '1',
        questionTitle: this.questionForm.controls['questionTitle'].value,
        question: this.questionForm.controls['question'].value,
        author: this.tokenStorage.getUser().username,
      };
      console.log(question.question, question.questionTitle, question.author);
    }

    // @ts-ignore
    this.forumService.postNewQuestion(question, '1').subscribe();
    window.location.reload();
  }
}
