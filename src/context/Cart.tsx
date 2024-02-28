import { createContext, useContext, useState } from 'react';
import type ProductType from '../types/Product';
import type ProviderType from '../types/Provider';
import type CartItemType from '../types/CardItem';
import supabase from '../api/Supabase';

interface CartContextType {
  increaseItemQuantity: (data:ProductType) => void;
  decreaseItemQuantity: (id:number) => void;
  removeItem: (id:number) => void;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
  cartItems: CartItemType[];
  cartQuantity: number;
  totalPrice: number;
  placeOrder: (order:any) => void;
}

const CartContext = createContext({} as CartContextType);

export function useCartContext(){
  return useContext(CartContext);
}

export function CartProvider({ children }: ProviderType){
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const openCart = () => {
    setIsOpen(true);
  }

  const closeCart = () => {
    setIsOpen(false);
  }

  const getCardQuantity = (items:CartItemType[]) => {
    return items.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  const getTotalPrice = (items:CartItemType[]) => {
    return items.reduce((totalPrice, item) =>
    (item.sale_percent > 0) ? item.sale_price*item.quantity + totalPrice
                            : item.price*item.quantity + totalPrice, 0);
  }

  const increaseItemQuantity = (data:ProductType) => {
    let currItems:CartItemType[] = [];
    if(cartItems.find(item => item.id == data.id) == null){
      currItems = [...cartItems, {...data, quantity:1}];
    }
    else{
      cartItems.map((item:CartItemType) => {
        if(item.id == data.id){
          item.quantity++;
        }
        else{
          return;
        }
      })
      currItems = cartItems;
    }
    setCartItems(currItems);
    setCartQuantity(getCardQuantity(currItems));
    setTotalPrice(getTotalPrice(currItems));
  }

  const decreaseItemQuantity = (id:number) => {
    let currItems:CartItemType[] = [];
    if(cartItems.find(item => item.id == id)?.quantity == 1){
      currItems = cartItems.filter(item => item.id !== id);
    }
    else{
      cartItems.map((item:CartItemType) => {
        if(item.id === id){
          item.quantity--;
        }
        else{
          return;
        }
      })
      currItems = cartItems;
    }
    setCartItems(currItems);
    setCartQuantity(getCardQuantity(currItems));
    setTotalPrice(getTotalPrice(currItems));
  }

  const removeItem = (id:number) => {
    let currItems:CartItemType[] = cartItems.filter(item => item.id != id);
    setCartItems(currItems);
    setCartQuantity(getCardQuantity(currItems));
    setTotalPrice(getTotalPrice(currItems));
  }

  const placeOrder = async (order:any) => {
    order.cart = cartItems;

    const { data, error } = await supabase
      .from('order')
      .insert([order])
      .select()
  }

  return (
    <CartContext.Provider value={{
      increaseItemQuantity,
      decreaseItemQuantity,
      removeItem,
      openCart, closeCart, isOpen,
      cartItems, cartQuantity, totalPrice, placeOrder
    }}>
      {children}
    </CartContext.Provider>
  )
}
