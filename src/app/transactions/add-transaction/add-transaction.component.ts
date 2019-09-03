import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  
  transactionForm;
  transaction: Transaction;
  categories: Array<Category>;

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) { 
    this.transactionForm = this.formBuilder.group({
      'date': [''],
      'period': [''],
      'amount': [''],
      'description': [''],
      'credit': [''],
      'debit': ['']
    })
  }

  ngOnInit() {
    this.transactionService.getCategories().subscribe(categories => {
      this.categories = categories["categories"];
      console.log(this.categories);
    })
  }


  sendTransaction() {
    console.log('opa')
    this.transactionService.sendTransaction(this.transactionForm.value).subscribe(data => {
      this.transaction = data;
      console.log(this.transaction)
    })
  }

}
