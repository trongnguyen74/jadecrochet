import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Home:React.FC = () => {
  return (
    <div>
      <div className="space-y-10">
        <div className="hero-image">
          <div className="hero-text space-y-2 h-[200px]">
            <span className="text-[20px] italic rotate-[120deg]">Welcome to</span>
            <div className="text-[30px]">
              Jade Crochet.
            </div>
            <br />
            <div>
              <Link to="/blog" className="border-[1px] border-[#FFF] border-solid rounded-[6px] p-4 hover:bg-[#FFF] hover:text-[#000]">Discover now</Link>
            </div>
          </div>
        </div>
        <div className="flex h-fit bg-[#fef4ea]">
          <div className="w-[40%] md:w-[18%]">
            <video className="w-full" autoPlay loop>
              <source src={process.env.PUBLIC_URL + '/assets/images/thumbnail-product-home.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="w-[65%] md:w-[75%] px-4">
            <div className="brittany-title text-[1.5rem] md:text-[2.5rem]">Get my products!</div>
            <div>
              <span className="hidden md:inline">Take look around my shop.</span> Here you will find my crochet patterns and collections. <span className="hidden md:inline">Hope you find your favorite products!</span>
            </div>
            <div className="text-center mt-2 md:mt-6">
              <Link className="button" to="/product">BUY NOW</Link>
            </div>
          </div>
        </div>
        <div className="h-fit">
          <div className="hero-blog w-[95vw] h-[220px] md:w-[70vw] md:h-[350px] md:mx-auto"></div>
          <div className="w-[80%] h-[160px] bg-[#fef4ea] mx-auto mt-[-80px] rounded-[6px] md:w-[60%] md:h-[180px] md:mt-[-130px]">
            <div className="text-[1.5rem] text-center brittany-title md:text-[2.5rem]">Visit my chart</div>
            <div className="px-4 text-center">Here where you can learn or discover how to crochet things in my collections </div>
            <div className="text-center mt-4 md:mt-6"><Link className="button" to="/chart">CLICK TO SEE</Link></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Home;
