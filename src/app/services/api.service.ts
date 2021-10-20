import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
  }

  public signup(signUpRequest: Object): Observable<any> {
    console.log(signUpRequest);
    return this.http.post<any>('http://localhost:8081/users', JSON.stringify(signUpRequest), {
      headers: this.httpHeaders,
    });
  }

  public signin(signInRequest: Object): Observable<any> {
    console.log(signInRequest);
    return this.http.post<any>('http://localhost:8081/signin', JSON.stringify(signInRequest), {
      headers: this.httpHeaders,
    });
  }

  public verify(verifyRequest: Object): Observable<any> {
    console.log(verifyRequest);
    return this.http.post<any>('http://localhost:8081/verify', JSON.stringify(verifyRequest), {
      headers: this.httpHeaders,
    });
  }

  public getCurrentUser(): Observable<any> {
    if (localStorage.getItem('accessToken') !== null) {
      this.httpHeaders = this.httpHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    }
    return this.http.get<any>('http://localhost:8081/users/me', {
      headers: this.httpHeaders,
    });
  }
}
