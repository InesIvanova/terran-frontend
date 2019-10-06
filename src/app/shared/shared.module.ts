import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';
import { FilterComponent } from './filter/filter.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { Chart } from 'chart.js';
import { BalanceCalendarComponent } from './balance-calendar/balance-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [NavbarComponent, PopUpComponent, FilterComponent, SubCategoryComponent, BalanceCalendarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule,
  ],
  exports: [ReactiveFormsModule,NavbarComponent, PopUpComponent, FilterComponent, SubCategoryComponent, CalendarModule,BalanceCalendarComponent]
})
export class SharedModule { }
