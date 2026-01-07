import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CtaComponent } from './cta.component';


describe('CtaComponent', () => {
  let fixture: ComponentFixture<CtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaComponent);
    fixture.detectChanges();
  });

  it('renders the signup CTA', () => {
    const text = fixture.nativeElement.textContent as string;
    const link = fixture.nativeElement.querySelector('a[routerLink="/onboarding"]') as HTMLElement;

    expect(text).toContain('Ready to Get Started?');
    expect(link).not.toBeNull();
  });
});
