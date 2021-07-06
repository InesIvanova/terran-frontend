import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitAndLossViewComponent } from './profit-and-loss-view.component';

describe('ProfitAndLossViewComponent', () => {
  let component: ProfitAndLossViewComponent;
  let fixture: ComponentFixture<ProfitAndLossViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitAndLossViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitAndLossViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
