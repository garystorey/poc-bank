import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';


describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('renders computed classes for variant and size', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.componentRef.setInput('size', 'full');
    fixture.componentRef.setInput('class', 'extra');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.className).toContain('btn');
    expect(button.className).toContain('btn-primary');
    expect(button.className).toContain('btn-full');
    expect(button.className).toContain('extra');
    expect(fixture.nativeElement.classList).toContain('btn-full');
  });

  it('supports disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('exposes the default title value', () => {
    expect(component.type()).toBe('button');
  });
});
