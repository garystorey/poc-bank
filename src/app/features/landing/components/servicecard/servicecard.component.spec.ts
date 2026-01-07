import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCardComponent } from './servicecard.component';


describe('ServiceCardComponent', () => {
  let fixture: ComponentFixture<ServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
  });

  it('renders the service content', () => {
    fixture.componentRef.setInput('service', {
      title: 'Checking Accounts',
      description: 'No monthly fees.',
    });
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('.service-card') as HTMLElement;
    expect(card.textContent).toContain('Checking Accounts');
    expect(card.textContent).toContain('No monthly fees.');
  });
});
