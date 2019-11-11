import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../services/authentication.service';
import { TransactionService } from '../services/transaction.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import { ProfitAndLossService } from '../services/profit-and-loss.service';
import { SearchComponent } from './search/search.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes = [
  {
    
    path: 'jurnal',
    component: SearchComponent,
    canActivate: [AuthGuardService]
    
  }
]


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, 
    AuthenticationService, 
    TransactionService, 
    ProfitAndLossService
  ],
  exports: [RouterModule],
  
})
export class CoreModule { }
