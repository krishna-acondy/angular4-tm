import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Case from 'app/models/case';
import 'rxjs/add/operator/map';

@Injectable()
export class CaseService {

  constructor(private http: Http) { }

  public getCases(): Observable<Case[]> {
    return this.http.get('../../../data/cases.json')
      .map(res => this.toCaseArray(res.json()));
  }

  private toCaseArray(data: any): Case[] {
    return data.map((parsedCase: any) => {
      return new Case(parsedCase.id, parsedCase.name, parsedCase.status, parsedCase.assignedTo);
    });
  }
}
