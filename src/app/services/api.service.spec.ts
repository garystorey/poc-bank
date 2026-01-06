import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { PaginatedResponse, UserDto } from '../types/api-types';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('lists users with pagination params', () => {
    const expected: PaginatedResponse<UserDto> = {
      data: [{ id: 1, name: 'Test', email: 'test@example.com' }],
      pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 },
    };

    service.listUsers({ page: 1, pageSize: 10 }).subscribe((response) => {
      expect(response).toEqual(expected);
    });

    const request = httpMock.expectOne('http://localhost:4000/api/users?page=1&pageSize=10');
    expect(request.request.method).toBe('GET');
    request.flush(expected);
  });

  it('re-seeds data', () => {
    service.reseed().subscribe((response) => {
      expect(response.message).toContain('Database');
    });

    const request = httpMock.expectOne('http://localhost:4000/api/admin/seed');
    expect(request.request.method).toBe('POST');
    request.flush({ message: 'Database reseeded' });
  });
});
