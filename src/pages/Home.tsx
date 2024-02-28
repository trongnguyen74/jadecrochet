import React from 'react';
import { useState, useEffect } from 'react'
import supabase from '../api/Supabase';
import { useTranslation } from "react-i18next";
import { ProductCard } from '../components/ProductCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home:React.FC = () => {
  const [list, setList] = useState<any>([]);
  const [isList, setIsList] = useState(0);
  const { t } = useTranslation();

  const getLatestProducts = async () => {
    let {data} = await supabase.from('product').select('*').order('id', { ascending: false }).gt('amount', 0).limit(10);
    setList(data);
    setIsList(1);
  }

  const getBestSellerProducts = async () => {
    let {data} = await supabase.from('product').select('*').order('sold', { ascending: false }).gt('amount', 0).limit(10);
    setList(data);
    setIsList(2);
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    }
  };

  useEffect(() => {
    getLatestProducts();
  }, []);

  return (
    <div>
      <div className="space-y-16">
        <div className="hero-image">
          <div className="hero-text w-full h-fit space-y-2">
            <div>
              <div className="brittany-title text-[4.5vw]">Welcome to</div>
              <div className="text-[8vw] montserrat">Jade Crochet.</div>
            </div>
          </div>
        </div>
        <div className="space-y-16">
          {
            (isList && (
              <div className="relative md:px-8">
                <div className="space-x-4 mb-4 ml-4">
                  <button
                    className={'montserrat button ' + ((isList == 1) ? 'selected' : '')}
                    onClick={getLatestProducts}
                  >
                    {t('The latest')}
                  </button>
                  <button
                    className={'montserrat button ' + ((isList == 2) ? 'selected' : '')}
                    onClick={getBestSellerProducts}
                  >
                    {t('The best seller')}
                  </button>
                </div>
                <Carousel
                  swipeable={true}
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  responsive={responsive}
                  itemClass="p-2 md:p-4"
                  partialVisible={false}
                >
                  {
                    list.map((obj:any) => {
                      return (
                        <ProductCard detail={obj} type={(isList == 2) ? 'best-seller' : null} key={obj.id}/>
                      )
                    })
                  }
                </Carousel>
              </div>
            ))
          }
        </div>
        <div id="about" className="flex flex-col md:flex-row space-y-6 md:space-x-10 bg-[#e8f6f1] montserrat">
          <div className="w-[100%] md:w-[40%]">
            <img
              src="https://res.cloudinary.com/deefrqkiu/image/upload/v1706971830/418690117_1551416055677053_8104748030103670130_n_k3gh0a.jpg"
              className=""
            />
          </div>
          <div className="flex items-center w-[100%] md:w-[60%] text-[18px] md:text-[20px]">
            <div className="space-y-4 px-8">
              <h2 className="text-[40px]">{t('About')}</h2>
              <div className="text-justify pb-6 md:pb-0">
                {t('Welcome to Jade Crochet, your premier destination for exquisite crochet creations and insightful blog content. Explore our curated collection of handcrafted crochet products, meticulously crafted to elevate your style and comfort. Join our vibrant community of crochet enthusiasts as we share tips, tutorials, and inspiration to ignite your passion for the art of crochet.')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
