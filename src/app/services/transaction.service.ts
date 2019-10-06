import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { Account } from '../models/account';
import { Category } from '../models/category';
import { Transfer } from '../models/transfer';

const path = environment.apiUrl;
const transactionUrl = path + 'transactions/';
const transferUrl = path + 'transactions/transfers/'
const filterUrl = path + 'transactions/filter/'

const accouuntsUrl = path + 'accounts/accounts/';
const categoriesUrl = path + 'accounts/categories/';
const balanceUrl = path + 'accounts/balance/'


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

  searchTransactions(params) {
    let httpParams = new HttpParams({ fromObject: params });
    return this.http.get(filterUrl, {params:httpParams})
  }

  sendTransfer(transferData, account_id, type): Observable<Transfer> {
    transferData['to_account'] = account_id;
    transferData['type'] = type;
    return this.http.post<Transfer>(transferUrl, transferData);
  }

  searchTransfers(): Observable<Array<Transfer>> {
    return this.http.get<Array<Transfer>>(transferUrl);
  }

  endBalance(id) {
    return this.http.put(accouuntsUrl+ id + '/', {})
  }

  getBalance(id) {
    return this.http.get(balanceUrl + id + '/');
  }

}
