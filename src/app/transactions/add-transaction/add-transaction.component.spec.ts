import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// https://www.digitalocean.com/community/tutorials/angular-testing-httpclient#:~:text=Angular's%20HttpClient%20has%20a%20testing,to%20unit%20test%20HTTP%20requests.&text=In%20this%20article%2C%20you%20will,capabilities%20of%20the%20testing%20module.
import { RouterTestingModule } from '@angular/router/testing';
// https://dev.to/this-is-angular/testing-angular-routing-components-with-the-routertestingmodule-4cj0


import { AddTransactionComponent } from './add-transaction.component';
import { Category } from '../../models/category';
import { of } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { exception } from 'console';

describe('AddTransactionComponent', () => {
  // Examples of isolated testing
  let component: AddTransactionComponent;
  let fixture: ComponentFixture<AddTransactionComponent>;
  let categoriesPatch;
  beforeEach(async(() => {
    let cat: Category = {
      id: 1, 
    group: "income", 
    type: "test",
    name: "test",
    sub_categoories: []
  }
  let cat2: Category = {
    id: 2, 
    group: "expense", 
    type: "test",
    name: "test",
    sub_categoories: []
  }
  categoriesPatch = [cat, cat2]


    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        RouterTestingModule 
      ],
      declarations: [ 
        AddTransactionComponent 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    },)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter categories, which are income on init', () => {
    component.categories = categoriesPatch;
    expect(component.isIncome).toBe("income");
    component.filterCategories();
    expect(component.categoriesFiltered.length).toBe(1);
    expect(component.categories[0].group).toBe("income")
  })

  it('should change the popup value to true', () => {
    expect(component.popUpOpen).toBeFalsy();
    component.openPopUp();
    expect(component.popUpOpen).toBeTruthy();
  })

  it('should change to popup to false after delete', () => {
    expect(component.popUpOpen).toBeFalsy();
    component.openPopUp();
    expect(component.popUpOpen).toBeTruthy();
    component.deleteOption();
    expect(component.popUpOpen).toBeFalsy();

  })

  it('should filter expenses when triggered', () => {


    component.categories = categoriesPatch;

    expect(component.categoriesFiltered).toBeUndefined()

    component.changeIncomeExpense('expense');
    expect(component.categoriesFiltered.length).toBe(1)
  })

  it('should load income categories when loading categories', () => {
    const service = TestBed.get(TransactionService); // get your service
    spyOn(service, "getCategories").and.callFake(() => {
      return of(categoriesPatch);
    })
    expect(component.categories).toBeUndefined()
    component.loadCategories()
    expect(service.getCategories).toHaveBeenCalled()
    expect(component.categories.length).toBe(2)
  })

      // Example of unit shallow testing

  it('should list categoories', () => {

    const service = TestBed.get(TransactionService); // get your service
    spyOn(service, 'getAccounts').and.callFake(() => {
      return of([{id: 1, name: "hello"}]); 
    });
    component.loadAccounts();
    expect(service.getAccounts).toHaveBeenCalled();
    console.log(component.accounts)
    // When you render through test always trigger detectChanges
    fixture.detectChanges();

    let el: HTMLElement = fixture.nativeElement
    let dropDowns = el.querySelectorAll("#inputAccount");
    expect(dropDowns[0].textContent).toContain("hello")
  })

});
