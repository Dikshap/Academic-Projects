import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { RequirementsService } from './requirements.service';

describe('RoomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [RequirementsService]
    });
  });

  it('should be created', inject([RequirementsService], (service: RequirementsService) => {
    expect(service).toBeTruthy();
  }));
});
