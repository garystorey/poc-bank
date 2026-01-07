import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardheaderComponent } from './wizardheader.component';


describe('WizardheaderComponent', () => {
  let fixture: ComponentFixture<WizardheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardheaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardheaderComponent);
  });

  it('renders the provided title and description', () => {
    fixture.componentRef.setInput('title', 'Welcome');
    fixture.componentRef.setInput('description', 'Start your application.');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Welcome');
    expect(text).toContain('Start your application.');
  });
});
