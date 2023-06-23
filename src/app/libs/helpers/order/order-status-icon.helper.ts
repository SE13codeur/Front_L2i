export function getStatusIcon(status: string) {
  switch (status) {
    case 'En attente de confirmation':
      return 'hourglass_empty';
    case 'Confirmé':
      return 'check_circle';
    case 'En cours de livraison':
      return 'local_shipping';
    case 'Livré':
      return 'done_all';
    default:
      return 'info';
  }
}
