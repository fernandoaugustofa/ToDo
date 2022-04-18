import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  TaskList: any = [];
  TaskFilter = {
    id!: Number,
    title!: '',
    description!: '',
    status!: '',
    user_id!: ''
  };

  UserList: any = [];

  StatusList: any = [{name: 'Em Andamento'},{name: 'Concluida'}];

  constructor(
    public taskService: TaskService,
    public userService: UserService,
  ) { this.loadusers();
  this.loadTasks(); }

  loadTasks() {
    return this.taskService.Get().subscribe((data: {}) => {
      this.TaskList = data;
    })
  }

  loadusers() {
    return this.userService.Get().subscribe((data: {}) => {
      this.UserList = data;
    })
  }

  ngOnInit(): void {
  }


}
