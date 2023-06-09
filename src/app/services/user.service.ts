import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { SignUp,login } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http:HttpClient,private router:Router) { }

  userSignUp(user:SignUp){
    this.http.post("http://localhost:3000/users",user,{observe:'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
          localStorage.setItem('user',JSON.stringify(result.body));
          this.router.navigate(['/']);
      }
    })
  }
  userLogin(data:login){
    this.http.get<SignUp[]>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }
    });
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}