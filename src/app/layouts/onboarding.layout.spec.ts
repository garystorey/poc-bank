import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { OnboardingLayoutComponent } from './onboarding.layout';


describe('OnboardingLayoutComponent', () => {
  let fixture: ComponentFixture<OnboardingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingLayoutComponent, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingLayoutComponent);
    fixture.detectChanges();
  });

  it('wraps onboarding pages in the wizard container', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('.wizard-container')).not.toBeNull();
    expect(host.querySelector('app-topnav')).not.toBeNull();
    expect(host.querySelector('app-footer')).not.toBeNull();
  });
});
