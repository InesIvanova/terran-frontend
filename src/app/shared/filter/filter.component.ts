import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  
  @Output() filterChange = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private transactioService: TransactionService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      'from': [''],
      'to': [''],
      'type': ['']
    })
  }

  filter() {
    if (this.isIncome == 'transfer') {
      this.transactioService.searchTransfers().subscribe(data => {
        this.filterChange.emit(data);
        return;
      });

    }
    console.log(this.filterForm.value)
    this.transactioService.searchTransactions(this.filterForm.value).subscribe(data => {
      this.filterChange.emit(data);
    });
  }

  changeIncomeExpense(data) {
    this.isIncome = data;
    this.filterForm.controls['type'].setValue(data);
  }

}
