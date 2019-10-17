import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  transactions: Array<Transaction | Transfer>;
  @Output() selectedValue: EventEmitter<string> = new EventEmitter();
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
   if (!this.transactions) {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;  
      console.log(this.transactions) 
    });
   }
  }

  filterType(type) {
    this.selectedValue.emit(type)
  }

  getTransactions(filteredTransactions) {
    console.log('recieved emitted message', filteredTransactions)
    this.transactions = filteredTransactions
  }


}
