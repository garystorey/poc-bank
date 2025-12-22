import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingheaderComponent } from './onboardingheader.component';

describe('OnboardingheaderComponent', () => {
  let component: OnboardingheaderComponent;
  let fixture: ComponentFixture<OnboardingheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
