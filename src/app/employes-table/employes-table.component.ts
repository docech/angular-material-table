import { Component, OnInit } from '@angular/core';
import {Employee, EmployeeColumn} from '../employe';
import {EmployeeDatasource} from '../employee-datasource';
import {EmployeService} from '../employe.service';
import {WorkPosition} from '../work-position';
import {WorkPositionService} from '../work-position.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-employes-table',
  templateUrl: './employes-table.component.html',
  styleUrls: ['./employes-table.component.css']
})
export class EmployesTableComponent implements OnInit {
  //displayedColumns: EmployeeColumn[] = EmployeeColumn.toArray();
  displayedColumnsKeys: string[] = EmployeeColumn.visible().concat('actions');
  workPositions: WorkPosition[];
  dataSource: EmployeeDatasource;

  editedEmployee: Employee;
  backupEmployee: Employee;

  constructor(private employeeService: EmployeService, private workPositionService: WorkPositionService) {
    this.editedEmployee = null;
  }

  ngOnInit() {
    this.workPositionService.loadPositions().subscribe(positions => {
      this.workPositions = positions;
    });
    this.dataSource = new EmployeeDatasource(this.employeeService);
    this.dataSource.loadEmployees();
  }

  add(): void {
    this.editedEmployee = Employee.empty();
    this.dataSource.add(this.editedEmployee);
  }

  startEdit(employee: Employee): void {
    this.backupEmployee = Employee.clone(employee);
    this.editedEmployee = employee;
  }

  discardChanges(): void {
    if (this.editedEmployee.id !== null) {
      this.dataSource.switch(this.editedEmployee, this.backupEmployee);
    } else {
      this.dataSource.remove(this.editedEmployee);
    }

    this.cancelEdit();
  }

  confirmEdit(): void {
    let observeEdit: Observable<Employee>;
    if (this.editedEmployee.id !== null) {
      observeEdit = this.dataSource.update(this.editedEmployee);
    } else {
      observeEdit = this.dataSource.save(this.editedEmployee);
    }

    observeEdit.subscribe(this.cancelEdit.bind(this));
  }

  delete(): void {
  }

  private cancelEdit(): void {
    this.editedEmployee = null;
  }
}
