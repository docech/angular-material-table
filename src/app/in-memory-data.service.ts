import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Employee} from './employe';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {id: 1, firstname: 'Jan', lastname: 'Modrý', position: {id: 1, name: 'programátor'}, dateOfBirth: '27/05/2018'}
    ];
    return {employees};
  }

  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 11;
  }
}
