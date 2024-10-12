import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  uri = 'http://localhost:4000/register';

  registerClient(username,password,email,phone,type,firstname,lastname){
    const data = {
      username:username,
      password:password,
      email:email,
      phone:phone,
      type:type,
      firstname:firstname,
      lastname:lastname,
    }

    return this.http.post(`${this.uri}/addClient`,data);
  }

  registerClientWithImage(username,password,email,phone,type,firstname,lastname,profileImg){
    const data = new FormData();
    data.append("username",username);
    data.append("password",password);
    data.append("email",email);
    data.append("phone",phone);
    data.append("type",type);
    data.append("firstname",firstname);
    data.append("lastname",lastname);
    data.append("profileImg",profileImg);

    return this.http.post(`${this.uri}/addClientWithImage`,data);
  }

  registerAgency(username,password,email,phone,type,agencyName,state,city,street,streetNum, mb, description){
    const data = {
      username:username,
      password:password,
      email:email,
      phone:phone,
      type:type,
      agencyName:agencyName,
      state:state,
      city:city,
      street:street,
      streetNum:streetNum,
      mb:mb,
      description:description,
    }

    return this.http.post(`${this.uri}/addAgency`,data);
  }

  registerAgencyWithImage(username,password,email,phone,type,agencyName,state,city,street,streetNum, mb, description, profileImg){
    const data = new FormData();
    data.append("username",username);
    data.append("password",password);
    data.append("email",email);
    data.append("phone",phone);
    data.append("type",type);
    data.append("agencyName",agencyName);
    data.append("state",state);
    data.append("city",city);
    data.append("street",street);
    data.append("streetNum",streetNum);
    data.append("mb",mb);
    data.append("description",description);
    data.append("profileImg",profileImg);

    return this.http.post(`${this.uri}/addAgencyWithImage`,data);
  }
}
