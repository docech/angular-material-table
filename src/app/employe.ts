import {WorkPosition} from './work-position';
import {MatInput} from '@angular/material';

export class EmployeeColumn {
  static id = new EmployeeColumn('id', 'Id');
  static firstname = new EmployeeColumn('firstname', 'Firstname');
  static lastname = new EmployeeColumn('lastname', 'Lastname');
  static position = new EmployeeColumn('position', 'Position');
  static dateOfBirh = new EmployeeColumn('dateOfBirth', 'Date of birth');

  static visible(): string[] {
    return EmployeeColumn.toKeyArray();
  }

  static toArray(): EmployeeColumn[] {
    return [
      EmployeeColumn.id,
      EmployeeColumn.firstname,
      EmployeeColumn.lastname,
      EmployeeColumn.position,
      EmployeeColumn.dateOfBirh,
    ];
  }

  static toKeyArray(): string[] {
    return EmployeeColumn.toArray().map((value: EmployeeColumn) => {
      return value.key;
    });
  }

  toString() {
    return this.key;
  }

  private constructor(private key: string, private label: string, private input?: MatInput) {}
}

export class Employee {
  firstname: string;
  lastname: string;
  position: WorkPosition;
  dateOfBirth: Date;
  id: number;

  public static empty(): Employee {
    return {
      firstname: '',
      lastname: '',
      position: WorkPosition.empty(),
      dateOfBirth: null,
      id: null
    };
  }

  public static clone(employee: Employee): Employee {
    return {
      firstname: employee.firstname,
      lastname: employee.lastname,
      position: employee.position,
      dateOfBirth: employee.dateOfBirth,
      id: employee.id
    };
  }
}
