import { Component, OnInit } from '@angular/core';
import { Transfer } from '../../models/transfer';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from '../../models/transaction';
import { Account } from '../../models/account';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filteredTransactions: Array<Transaction |  Transfer>
  transactions: Array<Transaction |  Transfer>
  accounts: Array<Account>

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => {
      this.filteredTransactions = data;  
      this.transactions = data;
    });
    this.transactionService.getAccounts().subscribe(data => {
      this.accounts = data;
    })
  }

  filterAccountsTransactions(accountId=undefined) {
    if (accountId) {
      this.filteredTransactions = this.transactions.filter(t => t.account.id == accountId);
      return;
    }
    this.filteredTransactions = this.transactions;
  }

  filterKind(event) {
    if (event == 'income') {
      this.filteredTransactions = this.transactions.filter(t => t.type == event) 
    }
    else if (event == 'expense') {
      this.filteredTransactions = this.transactions.filter(t => t.type == event) 
    }
    else {
      this.filteredTransactions = this.transactions
    }
  }

}
