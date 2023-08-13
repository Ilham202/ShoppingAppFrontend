import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    loginId: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  errors: any;

  submit(): void {
    console.log(this.form.getRawValue());
    this.authService.loginService(this.form.getRawValue())
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('userName', res.username);
          localStorage.setItem('role',res.roles[0])
          this.router.navigate(['/products']);
        },
        (error) => {
          this.errors = 'Username or password is incorrect.';
          setTimeout(() => {
            this.errors=null;
         }, 3000);
          console.log('issue');
        },
      );
  }
}
