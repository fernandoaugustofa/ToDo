
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

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
    // user: [{id: ''}, Validators.required],
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
    this.taskService.Create(this.TaskForm.value).subscribe((data: {}) => {

    })
  }

  loadusers() {
    return this.userService.Get().subscribe((data: {}) => {
      this.UserList = data;
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
