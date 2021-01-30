import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../_model/person';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  person:Person
  baseURL="https://mearn-stack-backend-test.herokuapp.com/"
  constructor(
    private httpClient:HttpClient
  ) { }


  register(person:Person){
    return this.httpClient.post(`${this.baseURL}user/register`,person)
  }
  login(person:Person){
    return this.httpClient.post(`${this.baseURL}user/login`,person)
  }


  isAuthenticated():boolean{
    if(localStorage.getItem('token')){
      return true
    }
    else{
      return false
    }
  }
}
