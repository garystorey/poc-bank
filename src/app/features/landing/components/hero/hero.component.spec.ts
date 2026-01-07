import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroComponent } from './hero.component';


describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('renders the hero headline and CTA', () => {
    const text = fixture.nativeElement.textContent as string;
    const link = fixture.nativeElement.querySelector('a[routerLink="/onboarding"]') as HTMLElement;

    expect(text).toContain('Banking Made Simple for Everyone');
    expect(link).not.toBeNull();
  });
});
