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
  isIncome: string = 'income';
  isSubmited: boolean = false;
  popUpOpen: boolean = false;
  addSubCategory: boolean = false;
  categories: Array<Category>;
  categoriesFiltered: Array<Category>;
  toAccount: number;

  constructor(private formBuilder: FormBuilder, 
    private transactionService: TransactionService,
    private router: Router) { 
    this.transactionForm = this.formBuilder.group({
      'date': ['',],
      'period': ['', [Validators.required]],
      'amount': ['', [Validators.required, Validators.pattern("[0-9]+")]],
      'description': [''],
      'account': [''],  
      'category': [''],
      'new_category': this.formBuilder.group({
        'group': [''],
        'type': [''],
        'name': [''],
        'sub_categories': ['']
      })
    })
  }

  get formControls() { return this.transactionForm.controls; }

  ngOnInit() {
    this.loadAccounts()
  }

  changeIncomeExpense(data) {
    this.isIncome = data;
    this.filterCategories()
  }

  loadCategories() {
    this.transactionService.getCategories().subscribe(categories => {
      this.categories = categories
      console.log('cates', this.categories)
      console.log('prop',this.categories[0].group)
      this.categoriesFiltered = this.categories.filter(c => c.group == this.isIncome );
      
    })
  }

  filterCategories() {
      this.categoriesFiltered = this.categories.filter(c => c.group == this.isIncome);
  }

  loadAccounts() {
    this.transactionService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.loadCategories();
      console.log(this.accounts);
    })
  }

  bindToAccountId(event) {
    this.toAccount = parseInt(event);
  }

  openPopUp() {
    this.popUpOpen = true;
  }

  openAddSubCategory() {
    this.addSubCategory = true;
  }

  deleteOption() {
    this.popUpOpen = false;
  }

  cancelOption() {
    this.popUpOpen = false;
  }

  createCategiry() {
    this.transactionService.createCategory(this.transactionForm.value['new_category']).subscribe(data  => {
      this.loadCategories();
      this.cancelOption();
    }) 
  }

  sendTransaction() {
    this.isSubmited = true;
    if(this.transactionForm.invalid){
      return;
    }
    this.transactionForm.controls['period'].setValue(this.transactionForm.controls['period'].value + '-01')
    console.log(this.toAccount)
    if (this.toAccount != 0) {
      this.transactionService.sendTransaction(this.transactionForm.value, this.isIncome, this.toAccount).subscribe(data => {
        this.transaction = data;
        // this.router.navigate(['/transactions'])
      })
    }
    else {
      this.transactionService.sendTransaction(this.transactionForm.value, this.isIncome).subscribe(data => {
        this.transaction = data;
        this.router.navigate(['/transactions'])
      })
    }
  }

}
