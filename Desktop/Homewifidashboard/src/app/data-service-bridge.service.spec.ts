import { TestBed, inject } from '@angular/core/testing';

import { DataServiceBridgeService } from './data-service-bridge.service';

describe('DataServiceBridgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataServiceBridgeService]
    });
  });

  it('should be created', inject([DataServiceBridgeService], (service: DataServiceBridgeService) => {
    expect(service).toBeTruthy();
  }));
});
