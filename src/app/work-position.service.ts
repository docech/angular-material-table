import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkPosition} from './work-position';
import {map, reduce, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkPositionService {
  private positionsApiUrl = 'http://ibillboard.com/api/positions';

  constructor(
    private http: HttpClient
  ) { }

  public loadPositions(): Observable<WorkPosition[]> {
    return this.http.get<any>(this.positionsApiUrl)
      .pipe(
        map(response => response.positions),
        map( positions => {
          const workPositions: WorkPosition[] = [];
          positions.forEach((value, index) => workPositions.push({id: index, name: value}));
          return workPositions;
        })
      );
  }
}
