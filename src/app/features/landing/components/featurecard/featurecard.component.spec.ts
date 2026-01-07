import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCardComponent } from './featurecard.component';


describe('FeatureCardComponent', () => {
  let fixture: ComponentFixture<FeatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCardComponent);
  });

  it('renders the feature title and description', () => {
    fixture.componentRef.setInput('feature', {
      icon: 'fa-star',
      title: 'Secure',
      description: 'Protected by encryption.',
    });
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('.feature-card') as HTMLElement;
    expect(card.textContent).toContain('Secure');
    expect(card.textContent).toContain('Protected by encryption.');
  });
});
