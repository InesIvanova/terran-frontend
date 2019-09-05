import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { Category } from '../models/category';

const path = environment.apiUrl;
const transactionUrl = path + 'transactions/';
const categoriesUrl = path + 'transactions/categories/';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  sendTransaction(data): Observable<Transaction> {
    return this.http.post<Transaction>(transactionUrl, data);
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(categoriesUrl);
  }

  getTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(transactionUrl)
  }

  createCategory(category) {
    return this.http.post(categoriesUrl, category);
  }

}
