import { SharedDataService } from './../../shared/service/shared-data.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
userForm:FormGroup
isDisabled:boolean
isDashboard:boolean
isPasswordMatched:boolean
isLoader:boolean


private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(public auth:AuthService, public router: Router,public sharedService:SharedDataService) { 
    this.isDisabled=true
    this.isLoader=false
  }

  ngOnInit(): void {
    this.createFormGroup()
    this.userForm.valueChanges.subscribe(data=>{
      
      if (!data.email|| !data.name|| !data.password|| !data.confirmPassword ||data.password!==data.confirmPassword){
        this.isDisabled=true
      }
      else{
        this.isDisabled=false
      }
      this.isPasswordMatched=(data.password===data.confirmPassword)?true:false 

    })

   
  }
  createFormGroup() {
    this.userForm = new FormGroup({
        email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        name: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),

       })
  }
 
 
  signUp(){
    this.isLoader=true
    if(!this.userForm.valid)
        {return} 
    const url='http://localhost:5000/api/users'
    const body={
      name:this.userForm.value.name,
      password:this.userForm.value.password,
      email:this.userForm.value.email
    }
    this.auth.addNewUser(url,body).subscribe(response=>{
      this.auth.setUsertoLocalStorage(response)
      this.router.navigateByUrl('/dashboard')

    },error=>{
       
      
    })
    

  }
}
