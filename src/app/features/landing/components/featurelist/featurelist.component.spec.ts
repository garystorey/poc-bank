import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturelistComponent } from './featurelist.component';

describe('FeaturelistComponent', () => {
  let component: FeaturelistComponent;
  let fixture: ComponentFixture<FeaturelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
