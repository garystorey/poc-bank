import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginPageComponent } from './loginpage.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

class MockApiService {
  listUsers = jasmine.createSpy('listUsers').and.returnValue(
    of({
      data: [
        {
          id: 1,
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
      ],
      pagination: { page: 1, pageSize: 50, pageCount: 1, total: 1 },
    })
  );
}

class MockAuthService {
  login = jasmine.createSpy('login');
  accountRoute = () => ['/accounts', '1'];
}

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let authService: MockAuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        { provide: ApiService, useClass: MockApiService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    fixture.detectChanges();
  });

  it('logs in and navigates when email is found', () => {
    component.form.controls.email.setValue('jane@example.com');
    component.form.controls.password.setValue('secret');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('1');
    expect(router.navigate).toHaveBeenCalledWith(['/accounts', '1']);
  });

  it('sets notFound error when no user matches', () => {
    const api = TestBed.inject(ApiService) as MockApiService;
    api.listUsers.and.returnValue(
      of({
        data: [],
        pagination: { page: 1, pageSize: 50, pageCount: 1, total: 0 },
      })
    );

    component.form.controls.email.setValue('missing@example.com');
    component.form.controls.password.setValue('secret');

    component.onSubmit();

    expect(component.form.controls.email.errors?.['notFound']).toBeTrue();
  });

  it('sets server error on API failure', () => {
    const api = TestBed.inject(ApiService) as MockApiService;
    api.listUsers.and.returnValue(throwError(() => new Error('network')));

    component.form.controls.email.setValue('jane@example.com');
    component.form.controls.password.setValue('secret');

    component.onSubmit();

    expect(component.form.controls.email.errors?.['server']).toBeTrue();
  });
});
