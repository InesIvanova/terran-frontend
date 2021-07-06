import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObservableComponent } from './my-observable.component';

describe('MyObservableComponent', () => {
  let component: MyObservableComponent;
  let fixture: ComponentFixture<MyObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
