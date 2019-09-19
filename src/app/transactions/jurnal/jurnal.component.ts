import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';
import { Transfer } from 'src/app/models/transfer';

@Component({
  selector: 'app-jurnal',
  templateUrl: './jurnal.component.html',
  styleUrls: ['./jurnal.component.scss']
})
export class JurnalComponent implements OnInit {
  @Input()
  transactions: Array<Transaction | Transfer>
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => {
      console.log(data)
      this.transactions = data;
    });
  }

  getTransactions(filteredTransactions) {
    console.log('recieved emitted message', filteredTransactions)
    this.transactions = filteredTransactions
  }


}
