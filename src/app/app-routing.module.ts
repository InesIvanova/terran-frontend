import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(mod => mod.TransactionsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: 'p-and-l',
    loadChildren: () => import('./profit-and-loss/profit-and-loss.module').then(mod => mod.ProfitAndLossModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./core/core.module').then(mod => mod.CoreModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
