import React from 'react';
import { useState, useEffect } from 'react';
import supabase from '../../api/Supabase';
import { useNavigate } from 'react-router-dom';
import { Tag, Card, List } from 'antd';
import ProductType from '../../types/Product';
import formatNumberCommas from '..//../utilities/NumberWithCommas';

const StoreList = () => {
  let [products, setProducts] = useState<any>([]);
  const [isData, setIsData] = useState(false);
  const navigate = useNavigate();

  async function getProducts() {
    let {data} = await supabase.from('product').select('*');
    setProducts(data);
    setIsData(true);
  }

  useEffect(() => {
    getProducts();
  }, []);

  if(isData){
    return (
      <div className="w-full">
        <List
          grid={{
            gutter: 14, //space between cards
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 6,
          }}
          dataSource={products}
          renderItem={(item:ProductType) => (
            <List.Item key={item.id}>
              <Card
                size="small"
                hoverable={true}
                className="h-[36vh] md:h-[40vh]"
                onClick={() => {navigate('/store/' + (item.name.toLowerCase().replace(/\s/g, '-')) + '/' + item.id)}}
              >
              <div className="flex justify-center h-[20vh]">
                <img className="h-full" src={item.images[0].url} />
              </div>
              <div className="mt-2 h-[6vh]">
                <span>{item.name}</span>
              </div>
              <div className="mt-2">
                {
                  item.sale_percent ?
                  <div>
                    <div className="text-[#ff9933] mt-1">
                      <del className="text-[12px] text-[#808080]">{formatNumberCommas(item.price)}₫</del>&nbsp;
                      <span className="font-bold">{formatNumberCommas(item.sale_price)}₫</span>
                    </div>
                    <Tag color="#f50">-{item.sale_percent.toFixed(0)}%</Tag>
                  </div>
                  :
                  <div className="text-[#ff9933] font-bold mt-1">{formatNumberCommas(item.price)}₫</div>
                }
              </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
  else{
    return <div></div>
  }
}

export default StoreList;
