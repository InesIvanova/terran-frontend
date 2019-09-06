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
  categories: Array<Category>;
  condition = true;
  isSubmited = false;
  popUpOpen = false;

  constructor(private formBuilder: FormBuilder, 
    private transactionService: TransactionService,
    private router: Router) { 
    this.transactionForm = this.formBuilder.group({
      'date': ['',],
      'period': ['', [Validators.required]],
      'amount': ['', [Validators.required, Validators.pattern("[0-9]+")]],
      'description': [''],
      'credit': [''],
      'debit': [''],
      'income': [true, [Validators.required]],
      'expense': [false, [Validators.required]]
    })
  }

  get formControls() { return this.transactionForm.controls; }

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.transactionService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    })
  }

  changeIncome() {
    this.transactionForm.controls['income'].setValue(true);
    this.transactionForm.controls['expense'].setValue(true);
    this.condition = true;
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
    this.transactionForm.controls['income'].setValue(false);
    this.transactionForm.controls['expense'].setValue(true);
    this.condition = false;
  }

  createCategiry() {
    var categoryName = String((<HTMLInputElement>document.getElementById('userInput')).value);
    categoryName = categoryName.replace(/^\w/, c => c.toUpperCase())
    console.log(categoryName)
    this.transactionService.createCategory({'name': categoryName}).subscribe(() => {
      this.popUpOpen = false;
      this.loadCategories();
    });
    
  }

  sendTransaction() {
    this.isSubmited = true;
    if(this.transactionForm.invalid){
      return;
    }
    this.transactionForm.controls['period'].setValue(this.transactionForm.controls['period'].value + '-01')
    this.transactionService.sendTransaction(this.transactionForm.value).subscribe(data => {
      this.transaction = data;
      console.log(this.transaction);
      this.router.navigate(['/transactions'])
    })
  }

}
