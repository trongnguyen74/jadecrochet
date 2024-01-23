import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Home:React.FC = () => {
  return (
    <div>
      <div className="space-y-10">
        <div className="hero-image">
          <div className="hero-text w-full h-fit space-y-2">
            <div>
              <div className="brittany-title text-[4.5vw]">Welcome to</div>
              <div className="text-[8vw]">Jade Crochet.</div>
            </div>
          </div>
        </div>
        <div className="w-[100%] md:w-[40%] md:min-w-[50%] flex h-fit bg-[#fef4ea] mx-auto">
          <div className="w-[50%]">
            <img className="w-full" src={process.env.PUBLIC_URL + '/assets/images/thumbnail-product-home.gif'} />
          </div>
          <div className="w-[50%] px-4">
            <div className="brittany-title text-[20px]">Get my products!</div>
            <div>
              Here you will find my crochet patterns and collections. Hope you find your favorite products!
            </div>
          </div>
        </div>
        <div className="text-center mt-4 md:mt-6">
          <Link className="home-button" to="/product">VISIT MY SHOP</Link>
        </div>
        <div className="h-fit">
          <div className="hero-blog w-[95vw] h-[220px] md:w-[70vw] md:h-[350px] md:mx-auto"></div>
          <div className="w-[80%] h-[140px] bg-[#fef4ea] mx-auto mt-[-80px] rounded-[6px] md:w-[60%] md:h-[160px] md:mt-[-130px]">
            <div className="text-[1.5rem] text-center brittany-title md:text-[2.5rem]">Visit my chart</div>
            <div className="px-4 text-center">Here where you can learn or discover how to crochet things in my collections </div>
          </div>
        </div>
        <div className="text-center mt-4 md:mt-6"><Link className="home-button" to="/chart">CLICK TO BROWSE CHART</Link></div>
        <div></div>
      </div>
    </div>
  )
}

export default Home;
