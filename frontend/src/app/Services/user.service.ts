import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000/user';

  login(username,password){
    const data = {
     username:username,
     password:password
    }

    return this.http.post(`${this.uri}/login`,data);
  }

  getUserByUsername(username){
    const data = {
     username:username
    }

    return this.http.post(`${this.uri}/getUserByUsername`,data);
  }

  getUserByEmail(email){
    const data = {
     email:email
    }

    return this.http.post(`${this.uri}/getUserByEmail`,data);
  }

  changePassword(username,password){
    const data = {
      username:username,
      password:password
    }

    return this.http.post(`${this.uri}/changePassword`,data);
  }

  getImg(imageName){
    const data = {
      imageName : imageName
    }
    
    return this.http.post(`${this.uri}/getImg`, data, {
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  addComment(username,myComment){
    const data = {
      username:username,
      myComment:myComment
    }

    return this.http.post(`${this.uri}/addComment`,data)
  }
}
