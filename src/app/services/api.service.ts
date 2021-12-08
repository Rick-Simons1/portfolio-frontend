import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.post<any>('/api/users', JSON.stringify(signUpRequest), {
      headers: this.httpHeaders,
    });
  }

  public signin(signInRequest: Object): Observable<any> {
    return this.http.post<any>('/api/signin', JSON.stringify(signInRequest), {
      headers: this.httpHeaders,
    });
  }

  public verify(verifyRequest: Object): Observable<any> {
    return this.http.post<any>('/api/verify', JSON.stringify(verifyRequest), {
      headers: this.httpHeaders,
    });
  }

  public getCurrentUser(): Observable<any> {
    if (localStorage.getItem('accessToken') !== null) {
      this.httpHeaders = this.httpHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    }
    return this.http.get<any>('/api/users/me', {
      headers: this.httpHeaders,
    });
  }

  public verifyReCaptcha(captchaResponse: string) {
    return this.http.post<any>(
      '/api/verifyCaptcha',
      { captchaResponse },
      {
        headers: this.httpHeaders,
      },
    );
  }
}
