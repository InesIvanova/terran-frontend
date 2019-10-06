import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { ProfitAndLossService } from 'src/app/services/profit-and-loss.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-profit-and-loss-view',
  templateUrl: './profit-and-loss-view.component.html',
  styleUrls: ['./profit-and-loss-view.component.scss']
})
export class ProfitAndLossViewComponent implements OnInit {
  expenses;
  incomes;
  constructor(private profitAndLossServices: ProfitAndLossService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.profitAndLossServices.getTransactionsReport().subscribe(data => {
      this.expenses = data[0].expense;
      this.incomes = data[0].income;
      console.log(this.expenses)
    })
  }


}
