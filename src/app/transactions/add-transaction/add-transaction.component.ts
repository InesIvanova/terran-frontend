import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, 
    private transactionService: TransactionService,
    private router: Router) { 
    this.transactionForm = this.formBuilder.group({
      'date': [''],
      'period': [''],
      'amount': [''],
      'description': [''],
      'credit': [''],
      'debit': [''],
      'income': [true],
      'expense': [false]
    })
  }

  ngOnInit() {
    this.transactionService.getCategories().subscribe(categories => {
      this.categories = categories["categories"];
      console.log(this.categories);
    })
  }

  changeIncome() {
    this.transactionForm.controls['income'].setValue(true);
    this.transactionForm.controls['expense'].setValue(true);
    this.condition = true;
  }

  changeExpense() {
    this.transactionForm.controls['income'].setValue(false);
    this.transactionForm.controls['expense'].setValue(true);
    this.condition = false;
  }


  sendTransaction() {
    console.log('opa')
    this.transactionService.sendTransaction(this.transactionForm.value).subscribe(data => {
      this.transaction = data;
      console.log(this.transaction);
      this.router.navigate(['/transactions'])
    })
  }

}
