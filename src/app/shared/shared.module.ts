import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';
import { FilterComponent } from './filter/filter.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';



@NgModule({
  declarations: [NavbarComponent, PopUpComponent, FilterComponent, SubCategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [ReactiveFormsModule,NavbarComponent, PopUpComponent, FilterComponent, SubCategoryComponent,]
})
export class SharedModule { }
