import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitAndLossViewComponent } from './profit-and-loss-view/profit-and-loss-view.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    
    path: '',
    component: ProfitAndLossViewComponent,
    canActivate: [AuthGuardService]
    
  }
]


@NgModule({
  declarations: [ProfitAndLossViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfitAndLossModule { }
