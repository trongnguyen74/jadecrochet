import type ProductType from '../types/Product';

export default interface CartItem extends ProductType {
  quantity: number;
}
