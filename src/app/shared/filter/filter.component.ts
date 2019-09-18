import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm;
  isIncome: string;

  constructor(private formBuilder: FormBuilder, private transactioService: TransactionService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      'from': [''],
      'to': [''],
      'type': ['']
    })
  }

  filter() {
    console.log(this.filterForm.value)
    this.transactioService.searchTransactions(this.filterForm.value).subscribe(data => {
      console.log(data)
    });
  }

  changeIncomeExpense(data) {
    this.isIncome = data;
    this.filterForm.controls['type'].setValue(data);
  }

}
