import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TopnavComponent } from './topnav.component';
import { AuthService } from '../../../services/auth.service';

class MockAuthService {
  isAuthenticated = signal(false);
  accountRoute = signal(['/accounts']);
  logout = jasmine.createSpy('logout');
}

describe('TopnavComponent', () => {
  let fixture: ComponentFixture<TopnavComponent>;
  let component: TopnavComponent;
  let authService: MockAuthService;
  let router: jasmine.SpyObj<Router>;

  beforeAll(() => {
    (window as typeof window & { matchMedia?: (query: string) => MediaQueryList }).matchMedia = () =>
      ({
        matches: false,
        media: '',
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  });

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TopnavComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopnavComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    fixture.detectChanges();
  });

  it('toggles the mobile menu', () => {
    expect(component.mobileMenuOpen()).toBeFalse();
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBeTrue();
  });

  it('handles authenticated logout flow', () => {
    authService.isAuthenticated.set(true);

    component.handleAuthAction();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.mobileMenuOpen()).toBeFalse();
  });

  it('hides menu content on onboarding pages', () => {
    fixture.componentRef.setInput('isOnboardingPage', true);
    fixture.detectChanges();

    const navWrapper = fixture.nativeElement.querySelector('.nav-wrapper') as HTMLElement | null;
    expect(navWrapper).toBeNull();
  });
});
