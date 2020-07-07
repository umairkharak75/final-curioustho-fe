import { AuthService } from './../service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup
isLoader:boolean
isValidCredentials:boolean
isDisabled:boolean
  constructor(public authService:AuthService,public router: Router) {
this.isDisabled=true
this.isValidCredentials=true
this.isLoader=false
   }

  ngOnInit(): void {
   const token=localStorage.getItem('token')
   if(token){
     this.router.navigateByUrl('dashboard')
   }

    this.loginForm=new FormGroup({
      email:new FormControl(),
      password:new FormControl()
    })

    this.loginForm.valueChanges.subscribe(value=>{
      if(!value.email || !value.password){
        this.isDisabled=true
      }else{this.isDisabled=false}
    })
  }
  login(){
    this.isLoader=true
    const url='http://localhost:5000/api/auth'
    const body={
    email:this.loginForm.value.email,
     password:this.loginForm.value.password
    }
    this.authService.login(url,body).subscribe(response=>{
      
      if(response.token){
        this.authService.setUsertoLocalStorage(response)
        this.isLoader=false
        this.router.navigateByUrl('/dashboard')
      }
      },error=>{
        this.isLoader=false
     if(error.status===400){
         this.isValidCredentials=false
     }


      })
  }

}
