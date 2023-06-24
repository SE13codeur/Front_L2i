export function getStatusIcon(status: string) {
  switch (status) {
    case 'PENDING':
      return 'hourglass_empty';
    case 'CONFIRMED':
      return 'check_circle';
    case 'SHIPPING':
      return 'local_shipping';
    case 'DELIVERED':
      return 'done_all';
    default:
      return 'info';
  }
}
