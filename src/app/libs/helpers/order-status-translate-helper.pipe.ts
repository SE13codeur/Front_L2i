import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'En attente de confirmation';
      case 'CONFIRMED':
        return 'Confirmé';
      case 'SHIPPING':
        return 'En cours de livraison';
      case 'DELIVERED':
        return 'Livré';
      default:
        return '';
    }
  }
}
