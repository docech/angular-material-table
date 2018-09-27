import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Employee} from './employe';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private employeeApiUrl = 'api/employees'

  constructor(
    private http: HttpClient
  ) { }

  public add(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeApiUrl, employee, httpOptions)
      .pipe(
        tap(employeeWithId => employee.id = employeeWithId.id),
        catchError(this.handleError<Employee>())
      );
  }

  public update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.employeeApiUrl, employee, httpOptions)
      .pipe(
        catchError(this.handleError<Employee>())
      );
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeApiUrl)
      .pipe(
        tap((employees: Employee[]) => console.log(employees)),
        catchError(this.handleError<Employee[]>())
      );
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
