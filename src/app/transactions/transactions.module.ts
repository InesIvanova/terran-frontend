import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../services/auth-guard.service';
import { JurnalComponent } from './jurnal/jurnal.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add',
    component: AddTransactionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'jurnal',
    component: JurnalComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [
    AddTransactionComponent,
    JurnalComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TransactionsModule { }
