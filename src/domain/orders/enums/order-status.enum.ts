export enum OrderStatuseEnum {
  AWAIT_PAYMENT = 'AWAIT_PAYMENT', // La commande a été passée, mais le paiement est en attente
  AWAIT_SHIPMENT = 'AWAIT_SHIPMENT', // Le paiement de la commande a été reçu, et la commande est en attente
  ALMOST_SHIPPING = 'ALMOST_SHIPPING', // La commande a été expédiée par le vendeur. Elle est en transit vers l'acheteur.
  SHIPPED = 'SHIPPED', // La commande a été expédiée par le vendeur. Elle est maintenant en transit vers l'acheteur.
  IN_TRANSIT = 'IN_TRANSIT', // La commande est en cours de livraison
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
