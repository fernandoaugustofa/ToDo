import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  Task!: any;

  constructor(
    public taskService: TaskService,
  ) { }

  ngOnInit(): void {
    console.log(this.Task)
  }

  deleteTask(){
    console.log(this.Task.id);
    this.taskService.Delete(this.Task.id).subscribe((data: {}) => {})
  }

  doneTask(){
    this.Task.status = 'done';
    this.taskService.Update(this.Task.id, this.Task).subscribe((data: {}) => {})
  }

}
