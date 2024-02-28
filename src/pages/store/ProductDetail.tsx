import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import supabase from '../../api/Supabase';
import { Tag, Divider, message, Breadcrumb, Image, Button, Rate } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useCartContext } from "../../context/Cart";
import SocialShare from '../../components/SocialShare';
import formatNumberCommas from '../../utilities/NumberWithCommas';
import { isEmptyObj } from '../../utilities/isEmptyObj';
import { useTranslation } from "react-i18next";
import {useProductContext} from '../../context/Product';

const ProductDetail = () => {
    const {increaseItemQuantity} = useCartContext();
    let {id} = useParams();
    const [data, setData] = useState<any>([]);
    const [isData, setIsData] = useState(false);
    const [activeImg, setActiveImage] = useState('');
    const {productDetail} = useProductContext();
    const { t } = useTranslation();

    async function getData() {
      if(isEmptyObj(productDetail) == true){ //get data from api if detail from props is empty (page refresh)
        let {data} = await supabase.from('product').select('*').eq('id', id);
        setData(data?.[0]);
      }
      else{ //get data from detail in props when user click product item
        setData(productDetail);
      }
      setIsData(true);
    }

    useEffect(() => {
      getData();
    }, []);

    if(isData){
      const {images} = data;
      return (
          <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center p-4 montserrat'>
              <div className='flex flex-col gap-6 lg:w-2/4'>
                  <Breadcrumb
                    className="montserrat"
                    items={[
                      {
                        title: <Link to="/">{t('Home')}</Link>,
                      },
                      {
                        title: <Link to="/store">{t('Store')}</Link>,
                      },
                      {
                        title: <span>{data.name}</span>,
                      },
                    ]}
                  />
                  <div className="w-full flex justify-center">
                    <div className="w-[330px]">
                      <Image src={(activeImg) ? activeImg : data.images[0].url} alt="" className='w-full h-full aspect-square object-contain rounded-xl bg-[#f3f5f9] p-6'/>
                    </div>
                  </div>
                  <div className='flex flex-row justify-center space-x-2 h-24'>
                    {
                      images.map((obj:any, index:number) => {
                        return <img key={'image' + index} src={obj.url} alt="" className='w-24 h-24 aspect-square object-contain rounded-xl bg-[#f3f5f9] p-4' onClick={() => setActiveImage(obj.url)}/>
                      })
                    }
                  </div>
              </div>
              <div className='flex flex-col gap-8 lg:w-2/4'>
                  <div className="space-y-4">
                    <h1 className='text-3xl'>{data.name}</h1>
                    <div className="">
                      <Rate disabled defaultValue={5}/>
                      <Divider type='vertical' className="bg-[#000]"/>
                      <span>{t('Sold')}: {data.sold}</span>
                    </div>
                  </div>
                  {
                    (data.sale_percent) ? (
                      <div className="space-y-2">
                        <Tag color="#008000" className="montserrat text-[16px] p-1">{data.sale_percent.toFixed(0)}% off</Tag>
                        <h6 className='text-2xl font-semibold space-x-4'>
                          <span>{formatNumberCommas(data.sale_price)}<sup>&#8363;</sup></span>
                          <del className="text-[#CCC]">{formatNumberCommas(data.price)}<sup>&#8363;</sup></del>
                        </h6>
                      </div>
                    ):
                    (
                      <h6 className='text-2xl font-semibold'>
                      {formatNumberCommas(data.price)}<sup>&#8363;</sup>
                      </h6>
                    )
                  }
                  <div className='flex flex-row items-center gap-4'>
                      <button
                        onClick={() => {increaseItemQuantity(data); message.success(t('Successfully add to cart'));}}
                        className="text-[18px] border-[2px] border-[solid] border-[#000] px-10 py-2 hover:bg-[#000] hover:text-[#FFF]"
                      >
                        <ShoppingCartOutlined /> {t('Add to cart')}
                      </button>
                      <Button icon={<HeartOutlined />}></Button>
                  </div>
                  <hr />
                  <div className="">
                    <div className="font-bold">{t('Description')}</div>
                    <div className="">{data.description}</div>
                  </div>
              </div>
          </div>
      )
    }
    else{
      return <div></div>
    }
}

export default ProductDetail
