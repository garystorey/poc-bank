import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheadingComponent } from './subheading.component';


describe('SubheadingComponent', () => {
  let fixture: ComponentFixture<SubheadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubheadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubheadingComponent);
  });

  it('renders the title and description', () => {
    fixture.componentRef.setInput('title', 'Section title');
    fixture.componentRef.setInput('description', 'Section description');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Section title');
    expect(text).toContain('Section description');
  });
});
