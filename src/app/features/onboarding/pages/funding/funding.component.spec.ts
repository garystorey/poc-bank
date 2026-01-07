import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { FundingComponent } from './funding.component';


describe('FundingComponent', () => {
  let fixture: ComponentFixture<FundingComponent>;
  let component: FundingComponent;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FundingComponent],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(FundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('does not navigate when form is invalid', () => {
    component.onSubmit();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.showSummary()).toBeTrue();
  });

  it('navigates back to onboarding when clicking previous', () => {
    component.onPrevious();
    expect(router.navigate).toHaveBeenCalledWith(['/onboarding']);
  });
});
