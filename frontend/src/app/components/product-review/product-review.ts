import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-review.html',
  styleUrl: './product-review.css'
})
export class ProductReviewComponent implements OnInit {
  product: Product | null = null;
  orderConfirmed = false;
  confirmationMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = this.productService.getSelectedProduct();
    
    if (!this.product) {
      this.productService.getSelectedProductFromServer().subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (error) => {
          console.error('Error fetching selected product:', error);
          this.router.navigate(['/']);
        }
      });
    }
  }

  onSubmitOrder(): void {
    if (this.product) {
      const orderData = {
        product: this.product,
        orderDate: new Date().toISOString()
      };

      this.productService.submitOrder(orderData).subscribe({
        next: (response) => {
          this.orderConfirmed = true;
          this.confirmationMessage = response.message;
        },
        error: (error) => {
          console.error('Error submitting order:', error);
        }
      });
    }
  }

  goBackToProducts(): void {
    this.router.navigate(['/']);
  }
}