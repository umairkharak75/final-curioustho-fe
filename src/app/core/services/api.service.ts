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
    return this.http.get<any>(url, this.createHeaders());
  }
  patchData(url, body?): Observable<any> {
    return this.http.patch<any>(url, body, this.createHeaders());
  }
  deleteData(url): Observable<any> {
    console.log(this.createHeaders);
    return this.http.delete<any>(url, this.createHeaders());
  }
  postData(url, body): Observable<any> {
    return this.http.post<any>(url, body, this.createHeaders());
  }
  postImageData(url, body): Observable<any> {
    const httpOptions = new HttpHeaders({
      'x-auth-token': this.sharedData.getToken(),
    });

    return this.http.post(url, body, {
      reportProgress: true,
      observe: 'events',
      headers: httpOptions,
    });
  }
  postProfilePic(url, body): Observable<any> {
    const httpOptions = new HttpHeaders({
      'x-auth-token': this.sharedData.getToken(),
    });

    return this.http.patch(url, body, {
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
    return this.http.post(url, subscription);
  }
}
