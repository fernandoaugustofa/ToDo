import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { task } from '../Model/task';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Error } from '../Util/handleError'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseurl = 'http://localhost:8081/task/';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  Create(data: task): Observable<task> {
    return this.http
      .post<task>(
        this.baseurl,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(Error.handleError));
  }

  GetById(id: string): Observable<task> {
    return this.http
      .get<task>(this.baseurl+ id)
      .pipe(retry(1), catchError(Error.handleError));
  }

  Get(): Observable<task> {
    return this.http
      .get<task>(this.baseurl)
      .pipe(retry(1), catchError(Error.handleError));
  }

  Update(data: task): Observable<task> {
    return this.http
      .put<task>(
        this.baseurl,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(Error.handleError));
  }

  Delete(id: string) {
    return this.http
      .delete<task>(this.baseurl + id, this.httpOptions)
      .pipe(retry(1), catchError(Error.handleError));
  }
}
