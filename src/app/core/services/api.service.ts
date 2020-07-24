import { environment } from './../../../environments/environment';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions;
  constructor(private http: HttpClient, public sharedData: SharedDataService) {}

  getData(url): Observable<any> {
    return this.http.get<any>(this.createUrl(url), this.createHeaders());
  }
  patchData(url, body?): Observable<any> {
    return this.http.patch<any>(
      this.createUrl(url),
      body,
      this.createHeaders()
    );
  }
  deleteData(url): Observable<any> {
    console.log(this.createHeaders);
    return this.http.delete<any>(this.createUrl(url), this.createHeaders());
  }
  postData(url, body): Observable<any> {
    return this.http.post<any>(this.createUrl(url), body, this.createHeaders());
  }
  postImageData(url, body): Observable<any> {
    const httpOptions = new HttpHeaders({
      'x-auth-token': this.sharedData.getToken(),
    });

    return this.http.post(this.createUrl(url), body, {
      reportProgress: true,
      observe: 'events',
      headers: httpOptions,
    });
  }
  postProfilePic(url, body): Observable<any> {
    const httpOptions = new HttpHeaders({
      'x-auth-token': this.sharedData.getToken(),
    });

    return this.http.patch(this.createUrl(url), body, {
      reportProgress: true,
      observe: 'events',
      headers: httpOptions,
    });
  }

  // return this.http.post<any>(url, body, header);

  createHeaders() {
    return (this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.sharedData.getToken() || '',
      }),
    });
  }

  public sendSubscriptionToTheServer(url, subscription: PushSubscription) {
    return this.http.post(this.createUrl(url), subscription);
  }

  createUrl(url) {
    const requestUrl = environment.backEndUrl + url;
    return requestUrl;
  }
}
