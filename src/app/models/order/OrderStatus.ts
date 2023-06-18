export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
}

export function getOrderStatusDescription(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING:
      return 'En attente de confirmation';
    case OrderStatus.CONFIRMED:
      return 'Confirmé';
    case OrderStatus.SHIPPING:
      return 'En cours de livraison';
    case OrderStatus.DELIVERED:
      return 'Livré';
    default:
      return '';
  }
}
