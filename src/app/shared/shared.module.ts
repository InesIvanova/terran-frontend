import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [NavbarComponent, PopUpComponent, FilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [ReactiveFormsModule,NavbarComponent, PopUpComponent, FilterComponent]
})
export class SharedModule { }
