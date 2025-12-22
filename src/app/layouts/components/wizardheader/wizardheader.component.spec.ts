import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardheaderComponent } from './wizardheader.component';

describe('WizardheaderComponent', () => {
  let component: WizardheaderComponent;
  let fixture: ComponentFixture<WizardheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WizardheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
