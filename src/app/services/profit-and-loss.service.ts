import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction';
import { Observable } from 'rxjs';

const path = environment.apiUrl;
const transactionIncomesUrl = path + 'transactions/report/';

@Injectable({
  providedIn: 'root'
})

export class ProfitAndLossService {
  constructor(private http: HttpClient) { }

  getTransactionsReport(): Observable<Array<any>> {
    return this.http.get<Array<any>>(transactionIncomesUrl);
  }
}
