import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  selectProduct(product: Product): Observable<any> {
    this.selectedProductSubject.next(product);
    return this.http.post(`${this.apiUrl}/select-product`, product);
  }

  getSelectedProduct(): Product | null {
    return this.selectedProductSubject.value;
  }

  getSelectedProductFromServer(): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/selected-product`);
  }

  submitOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-order`, orderData);
  }
}