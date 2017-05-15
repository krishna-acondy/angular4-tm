import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions,
  Http,
  HttpModule,
  Response,
  ResponseOptions,
  ResponseType,
  XHRBackend
} from '@angular/http';

import { CaseService } from './case.service';
import Case from 'app/models/case';

describe('CaseService', () => {
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let caseService: CaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseService, MockBackend, BaseRequestOptions, {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (xhrBackend: XHRBackend, defaultOptions: BaseRequestOptions) => new Http(xhrBackend, defaultOptions)
      }]
    });
  });

  beforeEach(inject([CaseService, MockBackend], (service, mockBackend) => {
    caseService = service;
    backend = mockBackend;
    backend.connections.subscribe((connection: MockConnection) => lastConnection = connection);
  }));

  it('should be created', () => {
    expect(caseService).toBeTruthy();
  });

  it('should return a list of cases', fakeAsync(() => {
    const call = caseService.getCases();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: `[
              {"id": 1, "name": "Case A", "status": "Open", "assignedTo": null},
              {"id": 2, "name": "Case B", "status": "Completed", "assignedTo": "Dr. Strange"}
             ]`
    })));

    tick();

    call.subscribe((result) => {
      expect(result.length).toEqual(2);
      result.map(item => expect(item).toEqual(jasmine.any(Case)));
    });
  }));
});
