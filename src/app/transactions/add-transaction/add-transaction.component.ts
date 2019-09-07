import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  
  transactionForm: FormGroup;
  transaction: Transaction;
  accounts;
  isIncome: boolean = true;
  isSubmited: boolean = false;
  popUpOpen: boolean = false;
  categories: Array<Category>;
  categoriesFiltered: Array<Category>;
  transfer: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private transactionService: TransactionService,
    private router: Router) { 
    this.transactionForm = this.formBuilder.group({
      'date': ['',],
      'period': ['', [Validators.required]],
      'amount': ['', [Validators.required, Validators.pattern("[0-9]+")]],
      'description': [''],
      'account': [''],  
      'category': ['']
    })
  }

  get formControls() { return this.transactionForm.controls; }

  ngOnInit() {
    this.loadAccounts()
  }

  loadCategories() {
    this.transactionService.getCategories().subscribe(categories => {
      this.categories = categories
      console.log('cates', this.categories)
      console.log('prop',this.categories[0].group)
      this.categoriesFiltered = this.categories.filter(c => c.group == "income" );
      
    })
  }

  filterCategories() {
    if (this.isIncome) {
      this.categoriesFiltered = this.categories.filter(c => c.group == "income");
    }
    else {
    this.categoriesFiltered = this.categories.filter(c => c.group == "expense");
    }
  }

  loadAccounts() {
    this.transactionService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.loadCategories();
      console.log(this.accounts);
    })
  }

  changeIncome() {
    this.isIncome = true;
    this.transfer = false;
    this.filterCategories();
  }
 
  openPopUp() {
    this.popUpOpen = true;
  }

  deleteOption() {
    this.popUpOpen = false;
  }

  cancelOption() {
    this.popUpOpen = false;
  }

  changeExpense() {
    this.isIncome = false;
    this.transfer = false;
    this.filterCategories()
  }

  changeTranser() {
    this.isIncome = false;
    this.transfer = true;
    this.filterCategories()
  }

  createCategiry() {
    var categoryName = String((<HTMLInputElement>document.getElementById('userInput')).value);
    categoryName = categoryName.replace(/^\w/, c => c.toUpperCase())
    console.log(categoryName)
    this.transactionService.createCategory({'name': categoryName}).subscribe(() => {
      this.popUpOpen = false;
      this.loadAccounts();
    });
    
  }

  sendTransaction() {
    this.isSubmited = true;
    if(this.transactionForm.invalid){
      return;
    }
    this.transactionForm.controls['period'].setValue(this.transactionForm.controls['period'].value + '-01')
    console.log(this.transactionForm.value)
    // this.transactionService.sendTransaction(this.transactionForm.value).subscribe(data => {
    //   this.transaction = data;
    //   console.log(this.transaction);
    //   this.router.navigate(['/transactions'])
    // })
  }

}
