// import { Component, OnInit } from '@angular/core';
// import { loadStripe } from '@stripe/stripe-js';

// @Component({
//   selector: 'app-payment-page',
//   templateUrl: './payment-page.component.html',
//   styleUrls: ['./payment-page.component.css'],
// })
// export class PaymentPageComponent implements OnInit {
//   stripePromise = loadStripe('stripe-public-key');

//   constructor() {}

//   ngOnInit(): void {}

//   async checkout(): Promise<void> {
//     const stripe = await this.stripePromise;
//     const response = await stripe?.redirectToCheckout({
//       lineItems: [{ price: 'price_1Hh1SWKbZ42DmuVWAgLSSSEV', quantity: 1 }],
//       mode: 'payment',
//       successUrl: 'https://website.com/success',
//       cancelUrl: 'https://website.com/canceled',
//     });

//     if (response && response.error) {
//       console.warn('Error:', response.error);
//     }
//   }
// }
