import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ReviewComponent } from './review.component';
import { ApiService, AuthService, OnboardingDataService } from '@services/index';


describe('ReviewComponent', () => {
  let fixture: ComponentFixture<ReviewComponent>;
  let component: ReviewComponent;
  let router: jasmine.SpyObj<Router>;
  let api: jasmine.SpyObj<ApiService>;
  let authService: jasmine.SpyObj<AuthService>;
  let onboardingData: OnboardingDataService;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    api = jasmine.createSpyObj('ApiService', ['createAccount']);
    authService = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReviewComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ApiService, useValue: api },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    onboardingData = TestBed.inject(OnboardingDataService);
    onboardingData.setIdentity({
      firstName: 'Jane',
      lastName: 'Doe',
      streetAddress: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      emailAddress: 'jane@example.com',
    });
    onboardingData.setFunding({
      initialAmount: '$500.00',
      depositMethod: 'ach',
      fundingSource: 'external',
      routingNumber: '123456789',
      accountNumber: '123456789',
      accountType: 'checking',
      bankName: 'POC Bank',
    });
    api.createAccount.and.returnValue(
      of({
        user: { id: 1, name: 'Jane Doe', email: 'jane@example.com' },
        account: { id: 10, userId: 1, type: 'checking', balance: 500 },
        transaction: {
          id: 100,
          accountId: 10,
          type: 'deposit',
          amount: 500,
          description: 'Initial deposit',
          postedAt: new Date().toISOString(),
        },
      }),
    );
    fixture.detectChanges();
  });

  it('navigates forward to confirmation', () => {
    component.handleCreateAccount();
    expect(api.createAccount).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith('1');
    expect(router.navigate).toHaveBeenCalledWith(['/onboarding/confirmation']);
  });

  it('navigates back to funding', () => {
    component.handlePrevious();
    expect(router.navigate).toHaveBeenCalledWith(['/onboarding/funding']);
  });
});
