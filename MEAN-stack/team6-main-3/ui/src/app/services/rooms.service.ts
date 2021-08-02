import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
};


var baseUrl = 'https://csci620-team6-api.azurewebsites.net/api/rooms';



@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl, httpOptions);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, httpOptions);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data, httpOptions);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data, httpOptions);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, httpOptions);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl, httpOptions);
  }

  findByAddress(address): Observable<any> {
    return this.http.get(`${baseUrl}?address=${address}`, httpOptions);
  }
}
