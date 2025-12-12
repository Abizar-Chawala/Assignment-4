const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: '/images/wireless-headphones.jpeg'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Feature-rich smartwatch with fitness tracking',
    image: '/images/smart-watch.jpeg'
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    description: 'Durable backpack with laptop compartment',
    image: '/images/laptop-backpack.jpeg'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 59.99,
    description: 'Portable speaker with amazing sound quality',
    image: '/images/bluetooth-speaker.jpeg'
  }
];

// Store selected product temporarily
let selectedProduct = null;

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/select-product', (req, res) => {
  selectedProduct = req.body;
  res.json({ message: 'Product selected', product: selectedProduct });
});

app.get('/api/selected-product', (req, res) => {
  if (selectedProduct) {
    res.json(selectedProduct);
  } else {
    res.status(404).json({ message: 'No product selected' });
  }
});

app.post('/api/submit-order', (req, res) => {
  console.log('Order received:', req.body);
  res.json({ message: 'Your item will be delivered soon.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});