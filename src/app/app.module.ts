import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProfitAndLossModule } from './profit-and-loss/profit-and-loss.module';
import { MyObservableComponent } from './demo_observables/my-observable/my-observable.component';

@NgModule({
  declarations: [
    AppComponent,
    MyObservableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    ProfitAndLossModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
