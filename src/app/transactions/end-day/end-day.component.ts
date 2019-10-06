import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-end-day',
  templateUrl: './end-day.component.html',
  styleUrls: ['./end-day.component.scss']
})
export class EndDayComponent implements OnInit {
  accounts: Array<Account>;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getAccounts().subscribe(accs => {
      this.accounts = accs;
      console.log(this.accounts)
    })
  }

  endDay(accountId) {
    this.transactionService.endBalance(accountId).subscribe(data => {
      console.log(data)
      //navigate to the calendar
    })
  }

}
