import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-jurnal',
  templateUrl: './jurnal.component.html',
  styleUrls: ['./jurnal.component.scss']
})
export class JurnalComponent implements OnInit {
  transactions: Array<Transaction>
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => {
      console.log(data)
      this.transactions = data;
    });
  }

  getTransactions() {
    
  }

}
