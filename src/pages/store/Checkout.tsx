import { useEffect, useState } from 'react';
import { Select, message, Input, Form, Button } from 'antd';
import { useCartContext } from "../../context/Cart";
import formatNumberCommas from '../../utilities/NumberWithCommas';
import { useTranslation } from "react-i18next";
import { EmptyOrder } from "../../components/EmptyOrder";
import {useNavigate} from 'react-router';
const superagent = require('superagent');

const Checkout = () => {
    const { cartItems, totalPrice, placeOrder } = useCartContext();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const filterOption = (input: string, option?: { label: string; value: string }) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const [cityList, setCityList] = useState<any>([]);
    const [districtList, setDistrictList] = useState<any>([]);
    const [wardList, setWardList] = useState<any>([]);
    const [districtID, setDistrictID] = useState<any>(null);
    const [shippingFee, setShippingFee] = useState(0);

    const onFinish = (order: any) => {
      navigate('/store/checkout-success');
      const { city, district, ward } = order;
      order.city = cityList.find((item:any) => item.value == city).label;
      order.district = districtList.find((item:any) => item.value == district).label;
      order.ward = wardList.find((item:any) => item.value == ward).label;
      order.cart = null;
      order.total = totalPrice + shippingFee;
      order.status = 1;
      placeOrder(order);
    };

    const getCity = () => {
         superagent
             .post('https://online-gateway.ghn.vn/shiip/public-api/master-data/province')
             .set({'Token': '677a0984-d18f-11ee-8529-6a2e06bbae55'})
             .accept('application/json')
             .then((res:any) => {
                 const list:any = res.body;
                 const { data } = list;
                 const listSelect:any = [];
                 data.map((obj:any) => {
                   listSelect.push({label: obj.ProvinceName, value: obj.ProvinceID})
                 })
                 setCityList(listSelect);
             })
             .catch((err:any) => {
                 throw err;
             });
    }

    const getDistrict = (cityID: number) => {
         superagent
             .post('https://online-gateway.ghn.vn/shiip/public-api/master-data/district')
             .send({province_id: cityID})
             .set({'Token': '677a0984-d18f-11ee-8529-6a2e06bbae55'})
             .accept('application/json')
             .then((res:any) => {
                 const list:any = res.body;
                 const { data } = list;
                 const listSelect:any = [];
                 data.map((obj:any) => {
                   listSelect.push({label: obj.DistrictName, value: obj.DistrictID})
                 })
                 setDistrictList(listSelect);
             })
             .catch((err:any) => {
                 throw err;
             });
    }

    const getWard = (districtID: number) => {
         superagent
             .post('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward')
             .send({district_id: districtID})
             .set({'Token': '677a0984-d18f-11ee-8529-6a2e06bbae55'})
             .accept('application/json')
             .then((res:any) => {
                 const list:any = res.body;
                 const { data } = list;
                 const listSelect:any = [];
                 data.map((obj:any) => {
                   listSelect.push({label: obj.WardName, value: obj.WardCode})
                 })
                 setWardList(listSelect);
             })
             .catch((err:any) => {
                 throw err;
             });
    }

    const showDistrictByCity = (cityId:number) => {
      setWardList([]);
      getDistrict(cityId);
    }

    const showWardByDistrict = (districtID:number) => {
      getWard(districtID);
      setDistrictID(districtID);
    }

    const getShippingFee = (wardCode:number) => {
      let strWardCode = wardCode.toString();
      const shipInfo = {
          "service_type_id":2,
          "insurance_value":totalPrice,
          "coupon": null,
          "from_district_id":1452,
          "to_district_id":districtID,
          "to_ward_code":strWardCode,
          "height":15,
          "length":15,
          "weight":100,
          "width":15
      }
      superagent
          .post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee')
          .send(shipInfo)
          .set({'Token': '677a0984-d18f-11ee-8529-6a2e06bbae55', 'shop_id':'4911019'})
          .accept('application/json')
          .then((res:any) => {
              const result:any = res.body;
              const { data } = result;
              const { total } = data;
              setShippingFee(total);
          })
          .catch((err:any) => {
              throw err;
          });
    }

    useEffect(() => {
      getCity();
    }, [])

    return (
      <div className="montserrat">
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">{t('Order summary')}</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {
                (cartItems.length <= 0) && ( <div>Giỏ hàng bạn đang trống</div> )
              }
              {
                cartItems.map((obj:any) => {
                  return (
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                      <div className='flex flex-row justify-center space-x-2 h-24 bg-[#f3f5f9] aspect-square'>
                        <img src={obj.images[0].url} alt="" className='w-24 h-24 rounded-md cursor-pointer object-contain scale-[0.75]'/>
                      </div>
                      <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold">{obj.name}</span>
                        <p className="text-lg">{(obj.sale_percent > 0) ? formatNumberCommas(obj.sale_price) : formatNumberCommas(obj.price)} &#8363;</p>
                        <span>{t('Amount')}: {obj.quantity}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium mb-8">{t('Payment details')}</p>
            <div className="">
              <Form
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                className="montserrat"
              >
                <div className="flex flex-row space-x-2">
                  <Form.Item
                    name="street"
                    rules={[{ required: true, message: t('Please input') + ' ' +  t('Street address') }]}
                    className="w-[50%]"
                  >
                    <Input className="montserrat" placeholder={t('Street address')} autoFocus={true}/>
                  </Form.Item>
                  <Form.Item
                    name="city"
                    rules={[{ required: true, message: t('Please input') + ' ' +  t('City') }]}
                    className="w-[50%]"
                  >
                    <Select
                      showSearch
                      autoClearSearchValue
                      placeholder={t('City')}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      options={cityList}
                      onChange={showDistrictByCity}
                      className="montserrat"
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-2">
                    <Form.Item
                      name="district"
                      rules={[{ required: true, message: t('Please input') + ' ' +  t('District') }]}
                      className="w-[50%]"
                    >
                      <Select
                        disabled = {(districtList.length > 0) ? false : true}
                        showSearch
                        autoClearSearchValue
                        placeholder={t('District')}
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={districtList}
                        className="w-[100%] montserrat"
                        onChange={showWardByDistrict}
                      />
                    </Form.Item>
                    <Form.Item
                      name="ward"
                      rules={[{ required: true, message: t('Please input') + ' ' +  t('Ward') }]}
                      className="w-[50%]"
                    >
                      <Select
                        disabled = {(wardList.length > 0) ? false : true}
                        showSearch
                        autoClearSearchValue
                        placeholder={t('Ward')}
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={wardList}
                        className="w-[100%] montserrat"
                        onChange={getShippingFee}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: t('Please input') + ' ' +  t('Phone') }]}
                    className="w-[100%]"
                  >
                    <Input placeholder={t('Phone')} className="montserrat"/>
                  </Form.Item>
                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{t('Subtotal')}</p>
                      <p className="font-semibold text-gray-900">{formatNumberCommas(totalPrice)} &#8363;</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{t('Shipping')}</p>
                      <p className="font-semibold text-gray-900">{(shippingFee) ? formatNumberCommas(shippingFee) : '---'} &#8363;</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{t('Total')}</p>
                    <p className="text-2xl font-semibold text-gray-900">{(shippingFee) ? formatNumberCommas(totalPrice + shippingFee) : '---'} &#8363;</p>
                  </div>
                </div>
                {
                  (cartItems.length > 0) ? (
                    <Button htmlType="submit" className="mt-4 mb-8 w-full h-[40px] montserrat bg-gray-900 font-medium text-white">{t('Place order')}</Button>
                  ):(
                    <button onClick={() => message.warning('Giỏ hàng bạn đang trống!')} className="mt-4 mb-8 w-full montserrat rounded-md bg-gray-900 px-6 py-3 font-medium text-white">{t('Place order')}</button>
                  )
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Checkout
