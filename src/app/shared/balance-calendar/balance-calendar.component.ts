import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Account } from '../../models/account';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-balance-calendar',
  templateUrl: './balance-calendar.component.html',
  styleUrls: ['./balance-calendar.component.scss']
})
export class BalanceCalendarComponent implements OnInit {
  viewDate: Date = new Date();
  
  events: Array<CalendarEvent> = new Array();
  event: CalendarEvent;
  accounts: Array<Account>

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getAccounts().subscribe(accs => {
      this.accounts = accs;
    })
  }

  getBalance(accId) {
    this.transactionService.getBalance(accId).subscribe(data => {
      this.events = new Array();
      for (let index = 0; index < data['data'].length; index++) {
        console.log(data['data'][index]['start'])
        data['data'][index]['start'] = new Date(data['data'][index]['start'])
        data['data'][index]['end'] = new Date(data['data'][index]['end']);
        this.event = data['data'][index];
        this.events.push(this.event)
      }
    })
  }

}
