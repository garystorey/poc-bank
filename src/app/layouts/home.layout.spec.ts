import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeLayoutComponent } from './home.layout';


describe('HomeLayoutComponent', () => {
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLayoutComponent, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeLayoutComponent);
    fixture.detectChanges();
  });

  it('renders the main shell with header and footer', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('app-topnav')).not.toBeNull();
    expect(host.querySelector('app-footer')).not.toBeNull();
    expect(host.querySelector('router-outlet')).not.toBeNull();
  });
});
