import { useState } from 'react';
import { message, Badge } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';
import formatNumberCommas from '../utilities/NumberWithCommas';
import { useCartContext } from '../context/Cart';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import type ProductType from '../types/Product';
import {useProductContext} from '../context/Product';

interface Props {
  detail: ProductType;
  type?: string|null;
}

export function ProductCard(props:Props) {
  const { detail, type } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { increaseItemQuantity } = useCartContext();
  const [add2CartDisplay, setAdd2CartDisplay] = useState({display: 'none'});
  const { viewProductDetail } = useProductContext();

  return (
    <div
      onClick={() => {
        navigate('/store/' + (detail.name.toLowerCase().replace(/\s/g, '-')) + '/' + detail.id);
        viewProductDetail(detail);
      }}
      className="basis-[49%] min-w-[49%] md:basis-[24%] md:min-w-[24%] lg:basis-[19%] lg:min-w-[19%] space-y-2 text-[16px] cursor-pointer whitespace-nowrap"
    >
      <Badge.Ribbon className={(type==null) ? 'montserrat hidden':'montserrat'} text={t('Sold') + ': ' + detail.sold}>
         <div
           className="relative bg-[#f3f5f9] aspect-square"
           onMouseEnter={() => {
              setAdd2CartDisplay({display: 'block'});
           }}
           onMouseLeave={() => {
              setAdd2CartDisplay({display: 'none'})
           }}
         >
           <div className="h-full flex items-center">
             <img className="object-contain scale-[0.75]" src={detail.images[0].url} />
           </div>
           <div className="absolute bottom-0 m-1 text-[14px] montserrat">
              <span className="bg-[#FFF] p-1">
                {
                  (detail.sale_percent > 0) ? (
                    <span>
                      <del className="text-[#CCC]">{formatNumberCommas(detail.price)}<sup>&#8363;</sup></del>&nbsp;
                      <span className="text-[#000]">{formatNumberCommas(detail.sale_price)}<sup>&#8363;</sup></span>
                    </span>
                  ):(
                    <span>
                      {formatNumberCommas(detail.price)}
                      <sup>&#8363;</sup>
                    </span>
                  )
                }
              </span>
              {
                (detail.sale_percent > 0) && (
                  <span className="text-[#008000] bg-[#FFF] p-1">-{detail.sale_percent.toFixed(0)}<PercentageOutlined /></span>
                )
              }
           </div>
           <div style={add2CartDisplay}>
             <div className="absolute w-full h-full top-0 z-2 bg-[#FFF] opacity-[0.5]"></div>
             <button
               disabled={(detail.amount > 0) ? false : true}
               onClick={(event) => {event.stopPropagation(); increaseItemQuantity(detail); message.success(t('Successfully add to cart')); event.preventDefault();}}
               className="montserrat absolute bottom-0 w-full border-[1px] border-[solid] border-[#000] bg-[#FFF] px-4 py-2 hover:bg-[#000] hover:text-[#FFF]"
             >
               {(detail.amount > 0) ? t('Add to cart') : t('Out of stock')}
             </button>
           </div>
         </div>
      </Badge.Ribbon>
      <div className="text-ellipsis whitespace-nowrap overflow-hidden montserrat">{detail.name}</div>
    </div>
  );
}
