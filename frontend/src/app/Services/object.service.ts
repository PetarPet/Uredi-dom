import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyObject } from '../Models/MyObject';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http:HttpClient) { }
  uri = 'http://localhost:4000/object';

  getAllObjectsForUser(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/getAllObjectsForUser`,data);
  }

  getAllRequestsForAgency(agency){
    const data = {
      agency:agency
    }

    return this.http.post(`${this.uri}/getAllRequestsForAgency`,data);
  }

  getAllActiveForAgency(agency){
    const data = {
      agency:agency
    }

    return this.http.post(`${this.uri}/getAllActiveForAgency`,data);
  }

  getAllObjects(){

    return this.http.get(`${this.uri}/getAllObjects`);
  }

  addNewObject(newObject:MyObject){
      const data = {
      idO:newObject.idO,
      owner:newObject.owner,
      type:newObject.type,
      area:newObject.area,
      rooms:newObject.rooms,
      state:newObject.state,
      city:newObject.city,
      street:newObject.street,
      streetNum:newObject.streetNum,
      sketch:newObject.sketch,
      }

    return this.http.post(`${this.uri}/addNewObject`,data);
  }

  deleteObject(idO){
    const data = {
      idO:idO
    }

    return this.http.post(`${this.uri}/deleteObject`,data);
  }

  changeObject(my){
    const data = {
      my:my
    }

  return this.http.post(`${this.uri}/changeObject`,data);
  }

  addJob(idO, jobID, dateFrom, dateTo, agency){
    const data = {
      idO:idO,
      jobID:jobID,
      dateFrom:dateFrom,
      dateTo:dateTo,
      agency:agency
    }

    return this.http.post(`${this.uri}/addJob`,data);
  }

  
  accept(idO,jobID){
    const data = {
      idO:idO,
      jobID:jobID
    }

  return this.http.post(`${this.uri}/acceptJobByClient`,data);
  }

  
  reject(idO,jobID){
    const data = {
      idO:idO,
      jobID:jobID
    }

  return this.http.post(`${this.uri}/rejectJobByClient`,data);
  }

  rejectByAgency(idO,jobID){
    const data = {
      idO:idO,
      jobID:jobID
    }

  return this.http.post(`${this.uri}/rejectJobByAgency`,data);
  }

  pay(idO,jobID){
    const data = {
      idO:idO,
      jobID:jobID
    }

    return this.http.post(`${this.uri}/pay`,data);
  }

  
  sendOffer(idO,jobID,offer){
    const data = {
      idO:idO,
      jobID:jobID,
      offer:offer
    }

    return this.http.post(`${this.uri}/sendOffer`,data);
  }

  setStatusForRoom(idO,name,status){
    const data = {
      idO:idO,
      name:name,
      status:status
    }

    return this.http.post(`${this.uri}/setStatusForRoom`,data);
  }
}
