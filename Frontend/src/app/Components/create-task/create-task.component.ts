
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { task } from '../../Model/task';

@Component({
  selector: 'create-task-modal',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @Input() Card: boolean = false;
  @ViewChild('modal') private modalContent!: TemplateRef<CreateTaskComponent>

  TaskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    deadline!: '',
    priority: ['', Validators.required],
    user: ['', Validators.required],
  });

  UserList: any = [];

  constructor(
    public taskService: TaskService,
    public userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { this.loadusers(); }

  ngOnInit(): void { }

  closeResult = '';

  submit() {
    console.log(this.TaskForm.value)
    let send = this.TaskForm.value;
    send.user = {id: this.TaskForm.value.user}
    console.log(send)
    this.taskService.Create(this.TaskForm.value).subscribe((data: {}) => {
      window.location.reload()
    })
  }

  loadusers() {
    return this.userService.Get().subscribe((data: {}) => {
      this.UserList = data;
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then();
  }

}
