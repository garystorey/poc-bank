import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { IdentityComponent } from './identity.component';


describe('IdentityComponent', () => {
  let fixture: ComponentFixture<IdentityComponent>;
  let component: IdentityComponent;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [IdentityComponent],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('formats the social security number input', () => {
    component.form.controls.socialSecurityNumber.setValue('123456789');
    expect(component.form.controls.socialSecurityNumber.value).toBe('123-45-6789');
  });

  it('navigates to funding when form is valid', () => {
    component.form.controls.firstName.setValue('Jane');
    component.form.controls.lastName.setValue('Doe');
    component.form.controls.dateOfBirth.setValue('1990-01-01');
    component.form.controls.socialSecurityNumber.setValue('123-45-6789');
    component.form.controls.streetAddress.setValue('123 Main St');
    component.form.controls.city.setValue('Seattle');
    component.form.controls.state.setValue('WA');
    component.form.controls.zipCode.setValue('98101');
    component.form.controls.emailAddress.setValue('jane@example.com');

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/onboarding/funding']);
  });
});
