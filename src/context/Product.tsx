import { createContext, useContext, useState } from 'react';
import type ProductType from '../types/Product';
import type ProviderType from '../types/Provider';

interface ProductContextType {
  productDetail: ProductType;
  viewProductDetail: (obj:ProductType) => void;
}

const ProductContext = createContext({} as ProductContextType);

export function useProductContext(){
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProviderType){
  const [productDetail, setProductDetail] = useState({} as ProductType);

  const viewProductDetail = (obj:ProductType) => {
    setProductDetail(obj);
  }

  return (
    <ProductContext.Provider value={{
      productDetail, viewProductDetail
    }}>
      {children}
    </ProductContext.Provider>
  )
}
