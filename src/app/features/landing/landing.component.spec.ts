import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LandingPageComponent } from './landing.component';


describe('LandingPageComponent', () => {
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
  });

  it('composes the landing sections', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('app-hero')).not.toBeNull();
    expect(host.querySelector('app-featurelist')).not.toBeNull();
    expect(host.querySelector('app-servicelist')).not.toBeNull();
    expect(host.querySelector('app-testimoniallist')).not.toBeNull();
  });
});
