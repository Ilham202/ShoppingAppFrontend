import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { ChangePassComponent } from './change-pass.component';

describe('ChangePassComponent', () => {
  let component: ChangePassComponent;
  let fixture: ComponentFixture<ChangePassComponent>;
  let formBuilder:FormBuilder;
  let formGroup : FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ ChangePassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = new FormBuilder();
    formGroup = formBuilder.group({
      loginId : new FormControl(''),
      password: new FormControl(''),
      confirm_password : new FormControl('')},
      { validator : component.ConfirmedValidator('password','confirm_password')});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errros on not matching',()=>{
    const passCtrl = formGroup.controls['password'];
    const cnfPassCtrl = formGroup.controls['confirm_password'];

    passCtrl.setValue('pass123');
    cnfPassCtrl.setValue('pass456');
    expect(cnfPassCtrl.errors).toEqual({ confirmedValidator : true});
 });

  it('should clear errros on matching',()=>{
     const passCtrl = formGroup.controls['password'];
     const cnfPassCtrl = formGroup.controls['confirm_password'];

     passCtrl.setValue('pass123');
     cnfPassCtrl.setValue('pass123');
     expect(cnfPassCtrl.errors).toBeNull();
  });
});
