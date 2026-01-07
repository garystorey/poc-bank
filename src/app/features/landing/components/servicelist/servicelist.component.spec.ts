import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListComponent } from './servicelist.component';


describe('ServiceListComponent', () => {
  let fixture: ComponentFixture<ServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceListComponent);
    fixture.detectChanges();
  });

  it('renders service cards for each service', () => {
    const cards = fixture.nativeElement.querySelectorAll('.service-card');
    expect(cards.length).toBe(4);
  });
});
