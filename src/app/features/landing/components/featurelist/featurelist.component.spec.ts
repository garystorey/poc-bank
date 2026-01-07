import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturelistComponent } from './featurelist.component';


describe('FeaturelistComponent', () => {
  let fixture: ComponentFixture<FeaturelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturelistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturelistComponent);
    fixture.detectChanges();
  });

  it('renders one card per feature', () => {
    const cards = fixture.nativeElement.querySelectorAll('.feature-card');
    expect(cards.length).toBe(3);
  });
});
