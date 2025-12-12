import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onBuyProduct(product: Product): void {
    this.productService.selectProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/review']);
      },
      error: (error) => {
        console.error('Error selecting product:', error);
      }
    });
  }
}