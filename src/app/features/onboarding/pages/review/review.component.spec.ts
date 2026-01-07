import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ReviewComponent } from './review.component';


describe('ReviewComponent', () => {
  let fixture: ComponentFixture<ReviewComponent>;
  let component: ReviewComponent;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReviewComponent],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('navigates forward to confirmation', () => {
    component.handleCreateAccount();
    expect(router.navigate).toHaveBeenCalledWith(['/onboarding/confirmation']);
  });

  it('navigates back to funding', () => {
    component.handlePrevious();
    expect(router.navigate).toHaveBeenCalledWith(['/onboarding/funding']);
  });
});
