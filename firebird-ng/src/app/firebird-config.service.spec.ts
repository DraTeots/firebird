import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FirebirdConfigService } from './firebird-config.service';
import * as jsoncParser from 'jsonc-parser';

describe('FirebirdConfigService', () => {
  let service: FirebirdConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FirebirdConfigService]
    });
    service = TestBed.inject(FirebirdConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding.
  });
  //
  it('should fetch and parse JSONC data correctly', () => {
    const dummyConfig = { serverPort: 5001 };
    const jsoncData = '{ "key": "value" // comment }';

    service.loadConfig().then(()=>{
      expect(service.config.serverPort).toBe(5001);
    });

    // Set up the HttpTestingController
    const req = httpMock.expectOne(service['configUrl']);
    expect(req.request.method).toBe('GET');
    req.flush('{ "serverPort": 5001, "useAuthentication": true, "logLevel": "info" }'); // Mock the HTTP response

  });
  //
  // it('should handle HTTP errors gracefully', () => {
  //   const errorResponse = new ErrorEvent('Network error');
  //
  //   service.getConfig().subscribe({
  //     next: config => fail('should have failed with the network error'),
  //     error: error => expect(error).toBeTruthy(),
  //     complete: () => fail('The request should not complete successfully')
  //   });
  //
  // });
});


// import { TestBed } from '@angular/core/testing';
//
// import { FirebirdConfigService } from './firebird-config.service';
//
// describe('FirebirdConfigService', () => {
//   let service: FirebirdConfigService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(FirebirdConfigService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
