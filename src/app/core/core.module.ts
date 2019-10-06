import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../services/authentication.service';
import { TransactionService } from '../services/transaction.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import { ProfitAndLossService } from '../services/profit-and-loss.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, 
    AuthenticationService, 
    TransactionService, 
    ProfitAndLossService
  ],
  exports: [],
  
})
export class CoreModule { }
