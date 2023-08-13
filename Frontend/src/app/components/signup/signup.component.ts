import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    loginId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  errors: any;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {
    this.form = this.formBuilder.group({
      loginId: new FormControl('', Validators.compose([Validators.required])),
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      contactNumber: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
    }, {
      validator: this.ConfirmedValidator('password', 'confirm_password')
    }
    );
  }

  ngOnInit(): void {

  }

  get f() {
    return this.form.controls;
  }




  submit(): void {
    console.log(this.form.getRawValue());
    this.authService.registerService(this.form.getRawValue())
      .subscribe((res: any) => {
        if (res.message) {
          alert(res.message);
          this.router.navigate(['/login']);
        }
      }, (error) => {
        alert('Something went Wrong!!');
      })

  }
  ConfirmedValidator(controlName: string, matchingName: string) {
    return (formgroup: FormGroup) => {
      const control = formgroup.controls[controlName];
      const matchingControl = formgroup.controls[matchingName]
      if( control.value !== matchingControl.value){
        matchingControl.setErrors({confirmedValidator:true});
      }else{
        matchingControl.setErrors(null);
      }
    }
  }

}
