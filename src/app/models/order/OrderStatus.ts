export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
}

export function getOrderStatusDescription(status: string): string {
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

export function statusDescriptionToEnum(
  statusDescription: string
): OrderStatus {
  switch (statusDescription) {
    case 'En attente de confirmation':
      return OrderStatus.PENDING;
    case 'Confirmé':
      return OrderStatus.CONFIRMED;
    case 'En cours de livraison':
      return OrderStatus.SHIPPING;
    case 'Livré':
      return OrderStatus.DELIVERED;
    default:
      return OrderStatus.PENDING;
  }
}
