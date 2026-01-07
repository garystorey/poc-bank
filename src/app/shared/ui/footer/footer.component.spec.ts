import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('renders the bank name and contact details', () => {
    const footerText = fixture.nativeElement.textContent as string;
    expect(footerText).toContain('POC Bank');
    expect(footerText).toContain('info@pocbank.com');
    expect(footerText).toContain('Member FDIC');
  });
});
