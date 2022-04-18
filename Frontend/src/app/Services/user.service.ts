import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { user } from '../Model/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Error } from '../Util/handleError'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = 'http://localhost:8081/user/';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  Create(data: user): Observable<user> {
    return this.http
      .post<user>(
        this.baseurl,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(Error.handleError));
  }

  GetById(id: string): Observable<user> {
    return this.http
      .get<user>(this.baseurl+ id)
      .pipe(retry(1), catchError(Error.handleError));
  }

  Get(): Observable<user> {
    return this.http
      .get<user>(this.baseurl)
      .pipe(retry(1), catchError(Error.handleError));
  }

  Update(id: string, data: user): Observable<user> {
    return this.http
      .put<user>(
        this.baseurl + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(Error.handleError));
  }

  Delete(id: string) {
    return this.http
      .delete<user>(this.baseurl + id, this.httpOptions)
      .pipe(retry(1), catchError(Error.handleError));
  }
}
