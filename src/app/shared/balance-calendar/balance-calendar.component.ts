import { Component, OnInit, OnChanges } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Account } from '../../models/account';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { Balance } from 'src/app/models/Balance';

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
  showJurnal: boolean = false;
  selectedDay = undefined;
  balances: Array<Balance>;
  requestedBalance: Balance | undefined;

  transactions: Array<Transaction>;
  filteredTraansactions: Array<Transaction>;;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getAccounts().subscribe(accs => {
      this.accounts = accs;
    });
    // this.transactionService.getTransactions().subscribe(data => {
    //   this.transactions = data;
    // })
    this.transactionService.getMonthlyRecords({
      'year': this.viewDate.getFullYear(), 'month': this.viewDate.getMonth()+1
    }).subscribe(data => {
      console.log(data)
      this.transactions = data
      this.transactionService.getBalances().subscribe(data => {
        this.balances = data;
      })
    })
  }

  highlightDay(event, bool) {
    console.log('hover day',event)
  }

  dayClicked(event) {
    console.log('dayClicked, ', event.day.date)
    this.selectedDay = event.day.date;
    this.filteredTraansactions = this.transactions.filter(t => this.formatDate(new Date(t.date)) == this.formatDate(this.selectedDay))
    console.log(this.filteredTraansactions)
    this.showJurnal = true;
    console.log(new Date(this.balances[0].day))
    event.day.date.setHours
    console.log(event.day.date);
    var a = this.balances.filter(b => this.formatDate(new Date(b.day)) == this.formatDate(event.day.date))
    console.log(a)
    if (a.length != 0) {
      this.requestedBalance = this.balances.filter(b => this.formatDate(new Date(b.day)) == this.formatDate(event.day.date))[0]
    }
    else {
      this.requestedBalance = undefined;
    }
    console.log(this.requestedBalance)
    console.log( event.day)
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

  filterKind(event) {
    if (event == 'income') {
      this.filteredTraansactions = this.transactions.filter(t => (this.formatDate(new Date(t.date)) == this.formatDate(this.selectedDay)) && (t.type == event)) 
    }
    else if (event == 'expense') {
      this.filteredTraansactions = this.transactions.filter(t => (this.formatDate(new Date(t.date)) == this.formatDate(this.selectedDay)) && (t.type == event)) 
    }
    else {
      this.filteredTraansactions = this.transactions.filter(t => (this.formatDate(new Date(t.date)) == this.formatDate(this.selectedDay))) 
    }
  }

  formatDate(date) {
    var dateObj = new Date(date);
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    var dayStr = day < 10 ? ('0' + day.toString()) : day;
    var monthStr = month < 10 ? ('0' + month.toString()) : month;

    var newdate = year + "-" + monthStr + "-" + dayStr;
    return newdate;
  }

}
