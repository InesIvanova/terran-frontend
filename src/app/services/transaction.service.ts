import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { Account } from '../models/account';
import { Category } from '../models/category';

const path = environment.apiUrl;
const transactionUrl = path + 'transactions/';
const accouuntsUrl = path + 'accounts/accounts/';
const categoriesUrl = path + 'accounts/categories/';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  sendTransaction(data, type, toAccount=null): Observable<Transaction> {
    data['type'] = type;
    console.log(data)
    if (toAccount) {
      data['to_account'] = toAccount;
    }
    return this.http.post<Transaction>(transactionUrl, data);
  }

  getAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(accouuntsUrl);
  }

  getTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(transactionUrl)
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(categoriesUrl);
  }

  createAccount(account) {
    return this.http.post(accouuntsUrl, account);
  }

  createCategory(categooryData) {
    return this.http.post(categoriesUrl, categooryData)
  }

  createSubCategories(categories) {
    return this.http.post(categoriesUrl, categoriesUrl)
  }

}
