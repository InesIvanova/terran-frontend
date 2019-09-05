import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';



@NgModule({
  declarations: [NavbarComponent, PopUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [ReactiveFormsModule,NavbarComponent, PopUpComponent]
})
export class SharedModule { }
