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
  events: Array<CalendarEvent> = [{"start": new Date("2019-10-06"), "end": new Date("2019-10-06"), "title": "37.0", "color": {"primary": "red", "secondary": "blue"}}];
  accounts: Array<Account>

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getAccounts().subscribe(accs => {
      this.accounts = accs;
    })
  }

  getBalance(accId) {
    this.transactionService.getBalance(accId).subscribe(data => {
      console.log(data);
      for (let index = 0; index < data['data'].length; index++) {
        data['data'][index]['start'] = new Date(data['data'][0]['start'])
        data['data'][index]['end'] = new Date(data['data'][0]['end'])

      }
      console.log('changed', data)
      this.events = data['data']
    })
  }

}
