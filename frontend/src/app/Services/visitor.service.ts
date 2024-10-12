import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private http:HttpClient) { }
  uri = 'http://localhost:4000/visitor';

  getAllAgencies(){
    return this.http.get(`${this.uri}/getAllAgencies`);
  }
  
}
