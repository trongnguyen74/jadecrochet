import { useState, useEffect } from 'react';
import supabase from '../../api/Supabase';
import { Spin, Button, Divider, Radio, Drawer } from 'antd';
import { LoadingOutlined, FilterOutlined } from '@ant-design/icons';
import { ProductCard } from '../../components/ProductCard';
import { BreadcrumbString } from '../../components/Breadcrumb';
import { useTranslation } from "react-i18next";
import type { RadioChangeEvent } from 'antd';
import type ProductType from '../../types/Product';

const ProductList = () => {
  let [rawProducts, setRawProducts] = useState<any>([]);
  let [products, setProducts] = useState<any>([]);
  let [isOpenPCFilter, setIsOpenPCFilter] = useState<boolean>(false);
  const [value, setValue] = useState();
  const { t } = useTranslation();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const sortPriceAsc = () => {
    let sort = rawProducts.sort((a:ProductType, b:ProductType) => (((a.sale_percent > 0) ? a.sale_price : a.price) - ((b.sale_percent > 0) ? b.sale_price : b.price)));
    setProducts(sort);
  }

  const sortPriceDesc = () => {
    let sort = rawProducts.sort((a:ProductType, b:ProductType) => (((b.sale_percent > 0) ? b.sale_price : b.price) - ((a.sale_percent > 0) ? a.sale_price : a.price)));
    setProducts(sort);
  }

  const filterSale = () => {
    let filter = rawProducts.filter((item:ProductType) => item.sale_percent > 0);
    setProducts(filter);
  }

  const filterNewest = () => {
    let filter = rawProducts.sort((a:ProductType, b:ProductType) => (b.id - a.id));
    setProducts([...filter]);
  }

  async function getProducts() {
    let {data} = await supabase.from('product').select('*');
    setProducts(data);
    setRawProducts(data)
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full md:px-10">
      <div className="flex items-center h-[30px]">
        <BreadcrumbString child="Store"/>
      </div>
      <div className="flex items-center justify-end h-[40px] pr-2 pb-2">
        <Button className="montserrat lg:hidden" icon={<FilterOutlined />} onClick={() => setIsOpenPCFilter(true)}>{t('Filter')}</Button>
      </div>
      <div className="relative flex w-full h-full space-x-4">
        <Drawer className="lg:hidden" onClose={() => setIsOpenPCFilter(false)} open={isOpenPCFilter} placement="left">
          <Radio.Group onChange={onChange} defaultValue={value} className="flex flex-col">
            <Divider plain orientation="left"><span className="font-bold">Shop by price</span></Divider>
            <Radio value="price-low-high" className="montserrat" onClick={sortPriceAsc}>{t('Low')} - {t('High')}</Radio>
            <Radio value="price-high-low" className="montserrat" onClick={sortPriceDesc}>{t('High')} - {t('Low')}</Radio>
            <Divider plain orientation="left"><span className="font-bold">Status</span></Divider>
            <Radio value="sale" className="montserrat" onClick={filterSale}>{t('Sale')}</Radio>
            <Radio value="newest" className="montserrat" onClick={filterNewest}>{t('Newest')}</Radio>
          </Radio.Group>
        </Drawer>
        <div className="flex w-full h-full hidden lg:block lg:w-[15%]">
          <div className="w-1/2 bg-[#FFF] space-y-2 pl-2 lg:w-full">
            <Radio.Group onChange={onChange} defaultValue={value} className="flex flex-col">
              <Divider plain orientation="left"><span className="font-bold">Shop by price</span></Divider>
              <Radio value="price-low-high" className="montserrat" onClick={sortPriceAsc}>{t('Low')} - {t('High')}</Radio>
              <Radio value="price-high-low" className="montserrat" onClick={sortPriceDesc}>{t('High')} - {t('Low')}</Radio>
              <Divider plain orientation="left"><span className="font-bold">Status</span></Divider>
              <Radio value="sale" className="montserrat" onClick={filterSale}>{t('Sale')}</Radio>
              <Radio value="newest" className="montserrat" onClick={filterNewest}>{t('Newest')}</Radio>
            </Radio.Group>
          </div>
          <div className="w-1/2 inset-0 bg-gray-500 bg-opacity-75 transition-opacity lg:hidden"></div>
        </div>
        {
          (products != '') ? (
            <div className="grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:w-[85%]">
            {
              products.map((item:ProductType) => {
                return (
                  <div key={item.id}>
                    <ProductCard detail={item}/>
                  </div>
                )
              })
            }
            </div>
          ):
          (
            <div className="absolute left-[50%] translate-x-[-50%]">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProductList;
