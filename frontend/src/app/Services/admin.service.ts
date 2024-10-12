import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000/admin';

  getNewRequests() {
    return this.http.get(`${this.uri}/getNewRequests`);
  }

  getAllUsers() {
    return this.http.get(`${this.uri}/getAllUsers`);
  }

  acceptRequest(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/acceptRequest`, data);
  }

  rejectRequest(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/rejectRequest`, data);
  }

  deleteUser(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/deleteUser`, data);
  }

  editClient(username, email, phone, firstname, lastname) {
    const data = {
      username: username,
      email: email,
      phone: phone,
      firstname: firstname,
      lastname: lastname
    }

    return this.http.post(`${this.uri}/editClient`, data);
  }

  editAgency(username, agencyName, state, city, street, streetNum, email, phone, mb, description) {
    const data = {
      username: username,
      agencyName: agencyName,
      state: state,
      city: city,
      street: street,
      streetNum: streetNum,
      email: email,
      phone: phone,
      mb: mb,
      description: description
    }

    return this.http.post(`${this.uri}/editAgency`, data);
  }

  getAllWorkersForAgency(agency) {
    const data = {
      agency: agency
    }

    return this.http.post(`${this.uri}/getAllWorkersForAgency`, data);
  }

  getAllWorkersInSystem() {
    return this.http.get(`${this.uri}/getAllWorkersInSystem`);
  }

  addWorker(workerID, firstname, lastname, email, phone, speciality, agency) {
    const data = {
      workerID: workerID,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      speciality: speciality,
      agency: agency,
    }

    return this.http.post(`${this.uri}/addWorker`, data);
  }

  deleteWorker(workerID) {
    const data = {
      workerID: workerID
    }

    return this.http.post(`${this.uri}/deleteWorker`, data);
  }

  editWorker(workerID, firstname, lastname, email,
    phone, speciality, agency) {
    const data = {
      workerID: workerID,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      speciality: speciality,
      agency: agency
    }

    return this.http.post(`${this.uri}/editWorker`, data);
  }

reserveWorker(workerID, dateFrom, dateTo, jobID){
  const data = {
    workerID: workerID,
    dateFrom: dateFrom,
    dateTo: dateTo,
    jobID: jobID,
  }

  return this.http.post(`${this.uri}/reserveWorker`, data);
}

}
