import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ERROR: String = '';

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.LoginForm.value)
    this.authService.SingIn(this.LoginForm.value).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.router.navigate(['/']);
    }, (err) => {this.ERROR= 'login e senha invalidos'});
  }

}
