import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      'from': [''],
      'to': [''],
      'income': [false],
      'expense': [false],
      'all': [true]
    })
  }

  filter() {
    console.log(this.filterForm.value)
  }

}
