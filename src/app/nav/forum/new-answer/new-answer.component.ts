import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { newAnswer } from '../model/newAnswer';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ForumService} from '../service/forum.service';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.scss']
})
export class NewAnswerComponent implements OnInit {
  public newAnswer: any;
  public formSubmitted: boolean;
  answerForm = new FormGroup({
    answer: new FormControl(''),
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
    let answer: newAnswer;
    for (const field in this.answerForm.controls) {
      // tslint:disable-next-line:prefer-const
      answer = {
        userId: '1',
        questionId: this.data.questionId,
        answer: this.answerForm.controls['answer'].value,
        author: this.tokenStorage.getUser().username,
      };
      console.log(answer);
    }

    // @ts-ignore
    this.forumService.postNewAnswer(answer, '1', this.data.questionId).subscribe();
    window.location.reload();

  }
}
