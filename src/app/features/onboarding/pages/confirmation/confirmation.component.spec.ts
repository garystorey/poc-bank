import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfirmationComponent } from './confirmation.component';


describe('ConfirmationComponent', () => {
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    fixture.detectChanges();
  });

  it('renders the confirmation message and actions', () => {
    const text = fixture.nativeElement.textContent as string;
    const links = fixture.nativeElement.querySelectorAll('a[routerLink]');

    expect(text).toContain('Account Created');
    expect(links.length).toBe(2);
  });
});
