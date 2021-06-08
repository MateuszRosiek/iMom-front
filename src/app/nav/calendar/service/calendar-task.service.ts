import {Injectable} from '@angular/core';
import {WebRequestService} from '../../../web-request.service';
import {Observable, Subject} from 'rxjs';
import {Task} from '../model/task';
import {newTask} from '../model/newTask';
import {EventCalendar} from '../model/eventCalendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  tasks: Task[] = [];
  subjectTasks: Subject<Task[]> = new Subject<Task[]>();
  readonly ROOT_URL;

  constructor(private webRequestService: WebRequestService) {
    this.ROOT_URL = '';

    this.getTaskFromRequestService();
  }

  // getUserCalendar(): Observable<any> {
  //   return this.webRequestService.get('calendar');
  // }

  getUserEvents(): Observable<EventCalendar[]> {
    return this.webRequestService.get('calendar-events');
  }

  getTasks(): Observable<Task[]> {
    this.subjectTasks.asObservable().subscribe(t => console.log(t));
    return this.subjectTasks.asObservable();
  }

  postNewTask(task: newTask, userId: string): void {
    this.webRequestService.post('users/' + userId + '/tasks-before-birth', task).subscribe(response => this.tasks.push(response as Task));
  }

  deleteTask(taskId: string): Observable<any> {
    return this.webRequestService.delete('tasks-before-birth/delete/' + taskId);
  }

  editTask(task: Task): Observable<any> {
    return this.webRequestService.post('tasks-before-birth/' + task.id + '/update', task);
  }

  getTask(taskId: string): Observable<Task> {
    return this.webRequestService.get('tasks-before-birth/' + +taskId);
  }


  postNewEvent(userEvent: EventCalendar): Observable<any> {
    return this.webRequestService.post('new-event', userEvent);
  }

  getTaskFromRequestService(): void {
    this.webRequestService.get('users/1/tasks-before-birth').subscribe(task => {
      console.log(task);
      this.tasks = task;
      this.subjectTasks.next(task);
    });
  }
}
