import {Component, Input, OnInit} from '@angular/core';
import {ForumQuestion} from '../model/forumQuestion';
import {ForumService} from '../service/forum.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NewQuestionComponent} from '../new-question/new-question.component';
import {MatDialog} from '@angular/material/dialog';
import {NewAnswerComponent} from '../new-answer/new-answer.component';

@Component({
  selector: 'app-forum-question',
  templateUrl: './forum-question.component.html',
  styleUrls: ['./forum-question.component.scss']
})
export class ForumQuestionComponent implements OnInit {
  question?: ForumQuestion;
  id: any;
  sub: any;

  constructor(private Activatedroute: ActivatedRoute,
              private router: Router,
              private forumService: ForumService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.sub = this.Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.forumService.getForumQuestionById(this.id).subscribe(question => this.question = question);

    });
    }

  addAnswerDialog(questionId: number) {
    this.dialog.open(NewAnswerComponent,{width: '800px', data: {questionId: this.id}});
  }
}
