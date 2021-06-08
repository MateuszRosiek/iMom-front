import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../nav/calendar/model/task';
import {MatDialog} from '@angular/material/dialog';
import {CalendarService} from '../../../nav/calendar/service/calendar-task.service';
import {NewTaskComponent} from '../new-task/new-task.component';
import {EditTaskComponent} from '../edit-task/edit-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  @Input() editTask!: Task;
  @Output() demo: EventEmitter<Task> = new EventEmitter();


  constructor(public dialog: MatDialog, private calendarService: CalendarService) {
  }


  deleteTask(task: Task) {
    const index: number = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    this.calendarService.deleteTask(task.id).subscribe();

  }

  ngOnInit(): void {
    this.calendarService.getTasks().subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    });
  }

  addTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.calendarService.getTasks().subscribe(tasks => this.tasks = tasks);
    });
  };

  editingTask(task: Task): void {
    // this.calendarService.getTask(task.id).subscribe(editTask => this.editTask = editTask);
    const dialogRef = this.dialog.open(EditTaskComponent, {
        width: '400px', data: {editingTask: task}
      }
    );
    // console.log(this.editTask.taskName);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.demo.emit(result);
    });
  }

  toggleStatus(task: Task) {
    task = {
      id: task.id,
      taskName: task.taskName,
      taskText: task.taskText,
      taskStatus: !task.taskStatus,
    };
    this.calendarService.editTask(task).subscribe();

  }

  ngAfterViewInit(): void {
    console.log('AfterView');
    this.calendarService.getTaskFromRequestService();
  }
}
