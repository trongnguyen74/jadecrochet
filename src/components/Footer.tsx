import React from 'react';

const Footer:React.FC = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full h-[180px] bg-[#919599] text-[#FFF] text-center text-[16px] space-y-6 md:flex-row md:space-y-0 md:h-[50px]">
      <div className="w-full md:flex md:space-x-8 md:pl-10">
        <div>Privacy policy</div>
        <div>Terms & conditions</div>
        <div>Contact us</div>
      </div>
      <div className="w-full space-x-6">
        <a href="https://www.facebook.com/profile.php?id=100068345624353" target="_blank">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://www.tiktok.com/@jade.crochet" target="_blank">
          <i className="fa-brands fa-tiktok"></i>
        </a>
      </div>
      <div className="w-full text-[14px]">
        <i className="fa-regular fa-copyright"></i> Jade Crochet
      </div>
    </footer>
  );
}

export default Footer;
