import {Employee} from './employe';
import {DataSource, CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmployeService} from './employe.service';

export class EmployeeDatasource implements DataSource<Employee> {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private employees: Employee[];

  constructor(private employeeService: EmployeService) {
    this.employees = [];
  }

  connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeesSubject.complete();
  }

  add(employee: Employee): void {
    this.employees.unshift(employee);
    this.employeesSubject.next(this.employees);
  }

  save(employee: Employee): Observable<Employee> {
    return this.employeeService.add(employee);
  }

  remove(employee: Employee): void {
    this.employees = this.employees.filter(employeeItem => employeeItem !== employee);
    this.employeesSubject.next(this.employees);
  }

  switch(original: Employee, newEmployee: Employee): void {
    const index = this.employees.indexOf(original);
    this.employees[index] = newEmployee;
    this.employeesSubject.next(this.employees);
  }

  update(employee: Employee): Observable<Employee> {
    return this.employeeService.update(employee);
  }

  loadEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        this.employeesSubject.next(this.employees);
      });
  }
}
