import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // httpOptions = {
  //   // headers: new HttpHeaders({
  //   //   'Content-Type': 'application/json'
  //   // })
  // }

  constructor( private http: HttpClient) { }
  getData(url): Observable<any> {
    return this.http.get<any>(url)
  }

  postData(url, body): Observable<any> {
    return this.http.post<any>(url, body)
  }

}
