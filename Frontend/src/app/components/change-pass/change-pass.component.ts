import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  form = new FormGroup({
    loginId: new FormControl(),
    password: new FormControl(),
    confirm_password: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      loginId: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
    },
    {
      validator: this.ConfirmedValidator('password', 'confirm_password')
    }
    );
  }
  errors: any;

  get f() {
    return this.form.controls;
  }
  
  submit(): void {
    console.log(this.form.getRawValue());
    this.authService.resetPassword(this.form.getRawValue())
      .subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigateByUrl('/login');
        },
        (error) => {
          this.errors = 'Login-Id is incorrect.';
          setTimeout(() => {
            this.errors = null;
          }, 3000);
          console.log('issue');
        },
        () => {
          // No errors, route to new page
        }
      );
  }
  ConfirmedValidator(controlName: string, matchingName: string) {
    return (formgroup: FormGroup) => {
      const control = formgroup.controls[controlName];
      const matchingControl = formgroup.controls[matchingName]
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
