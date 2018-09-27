import {Employee} from './employe';
import {EmployeeDatasource} from './employee-datasource';

export class EmployeeElement {
  public editing: boolean;
  public currentData?: Employee;
  public originalData: Employee;

  public static employee(employee: Employee): EmployeeElement {
    return new EmployeeElement(employee);
  }

  public constructor(data: Employee) {
    this.currentData = data;
    this.originalData = data;
    this.editing = false;
  }

  public startEdit(): void {
    this.editing = true;
    this.originalData = this.currentData;
  }

  public saveEdit(): void {
    this.editing = false;
    this.originalData = this.currentData;
  }

  public discardChanges(): void {
    this.editing = false;
    this.currentData = this.originalData;
  }
}
