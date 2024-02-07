import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import supabase from '../../api/Supabase';
import { Carousel, Tag, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import formatNumberCommas from '../../utilities/NumberWithCommas';

const ProductPage = () => {
    let {id} = useParams();
    const [data, setData] = useState<any>([]);
    const [isData, setIsData] = useState(false);

    async function getData() {
      let {data} = await supabase.from('product').select('*').eq('id', id);
      setData(data);
      setIsData(true);
    }

    const [activeImg, setActiveImage] = useState('');
    const [amount, setAmount] = useState(1);

    useEffect(() => {
      getData();
    }, []);

    if(isData){
      const detail = data[0];
      const {images} = detail

      return (
          <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
              <div className='flex flex-col gap-6 lg:w-2/4'>
                  <div className="h-[300px]">
                    <img src={(activeImg) ? activeImg : data[0].images[0].url} alt="" className='w-full h-full aspect-square object-contain rounded-xl'/>
                  </div>
                  <div className='flex flex-row justify-center space-x-2 h-24'>
                      {
                        images.map((obj:any) => {
                          return <img src={obj.url} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(obj.url)}/>
                        })
                      }
                  </div>
              </div>
              {/* ABOUT */}
              <div className='flex flex-col gap-4 lg:w-2/4'>
                  <div>
                      <span className=' text-violet-600 font-semibold'></span>
                      <h1 className='text-3xl font-bold'>{detail.name}</h1>
                  </div>
                  <p className='text-gray-700'>
                    {detail.description}
                  </p>
                  {
                    (detail.sale_percent) ? (
                      <h6 className='text-2xl font-semibold space-x-4'>
                        <del className="text-[#CCC] text-[14px]">{formatNumberCommas(detail.price)} &#8363;</del>
                        <span>{formatNumberCommas(detail.sale_price)} &#8363;</span>
                        <Tag color="#F50">-{detail.sale_percent}%</Tag>
                      </h6>
                    ):
                    (
                      <h6 className='text-2xl font-semibold'>
                      {formatNumberCommas(detail.price)} &#8363;
                      </h6>
                    )
                  }
                  <div className='flex flex-row items-center gap-12'>
                      <div className='flex flex-row items-center'>
                          <Button icon={<PlusOutlined />} onClick={() => setAmount((prev) => prev - 1)}></Button>
                          <span className='py-4 px-6 rounded-lg'>{amount}</span>
                          <Button icon={<MinusOutlined />} onClick={() => setAmount((prev) => prev + 1)}></Button>
                      </div>
                      <button className='home-button'>Add to Cart</button>
                  </div>
              </div>
          </div>
      )
    }
    else{
      return <div></div>
    }
}

export default ProductPage
