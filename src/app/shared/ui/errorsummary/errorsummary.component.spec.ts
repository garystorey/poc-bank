import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsummaryComponent } from './errorsummary.component';

describe('ErrorsummaryComponent', () => {
  let component: ErrorsummaryComponent;
  let fixture: ComponentFixture<ErrorsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorsummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
