import { Link } from 'react-router-dom';
import { useCartContext } from "../context/Cart";
import formatNumberCommas from '../utilities/NumberWithCommas';
import { Button, Space, Drawer, message } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { EmptyOrder } from "../components/EmptyOrder";

export function Cart() {
  const { t } = useTranslation();
  const {isOpen, closeCart, cartItems, increaseItemQuantity, decreaseItemQuantity, removeItem, totalPrice, cartQuantity} = useCartContext();

  return (
    <Drawer title={t('Shopping cart')} className="montserrat" onClose={closeCart} open={isOpen}>
      <div>
        {
          (cartItems.length > 0) ? (
            <ul role="list" className="-my-6 divide-y divide-gray-200 montserrat">
              {
                cartItems.map((obj:any) => {
                  return(
                    <li className="flex py-6 items-center" key={obj.id}>
                      <div className="h-24 w-24 rounded-md border border-gray-200 bg-[#f3f5f9] aspect-square">
                        <img src={obj.images[0].url} className="h-full w-full object-contain scale-[0.75]" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex flex-col font-medium text-gray-900">
                          <span className="w-[90%] whitespace-nowrap text-ellipsis overflow-hidden">{obj.name}</span>
                          <p className="text-[14px] text-[#737373]">{(obj.sale_percent > 0) ? formatNumberCommas(obj.sale_price) : formatNumberCommas(obj.price)} &#8363;</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                            <Space>
                              <button onClick={() => decreaseItemQuantity(obj.id)} className="py-2 hover:text-gray-700 dark:text-gray-400">
                                <MinusOutlined/>
                              </button>
                              <span className="px-3">{obj.quantity}</span>
                              <button onClick={() => increaseItemQuantity(obj)} className="py-2 hover:text-gray-700 dark:text-gray-400">
                                <PlusOutlined/>
                              </button>
                            </Space>
                          </div>
                          <Button icon={<DeleteOutlined />} onClick={() => removeItem(obj.id)}></Button>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          ):(
            <EmptyOrder />
          )
        }
      </div>
      <div className="border-t border-gray-200 py-6 mt-10 montserrat">
        <div className="flex justify-between text-base text-gray-900">
          <p>{t('Total')}<br /><span className="text-[#CCC]">{t('Shipping fees not included')}</span></p>
          <p>{formatNumberCommas(totalPrice)} &#8363;</p>
        </div>
        <div className="mt-6">
          {
            (cartQuantity > 0) ? (
              <Link to="/store/checkout" onClick={closeCart} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">{t('Checkout')}</Link>
            ):
            <button onClick={() => message.warning('Giỏ hàng bạn đang trống!')} className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">{t('Checkout')}</button>
          }
        </div>
      </div>
    </Drawer>
  )
}
