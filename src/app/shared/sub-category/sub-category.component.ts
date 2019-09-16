import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  @Input() isOpen = false;
  constructor() { }

  ngOnInit() {
  }

}
