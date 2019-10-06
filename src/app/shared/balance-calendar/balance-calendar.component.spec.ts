import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCalendarComponent } from './balance-calendar.component';

describe('BalanceCalendarComponent', () => {
  let component: BalanceCalendarComponent;
  let fixture: ComponentFixture<BalanceCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
