import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar:React.FC = () => {
  const [isOpen, openNav] = useState(false);
  let closeNavbar = () => openNav(false);
  let showNavBar = () => openNav(true);

  return (
    <nav id="navbar" className="flex items-center w-full h-[120px] px-[20px] justify-between">
      <div className="menu-mobile-button md:hidden" onClick={showNavBar}>
        <i className="fa-solid fa-bars text-[25px]"></i>
      </div>
      <Link to="/">
        <img className="w-[150px]" src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="logo"/>
      </Link>
      <ul className=
      {`absolute w-full h-[34%] z-10 bg-[#FFF] top-0 left-0 text-center space-y-10 margin:0 padding:0 ${isOpen ? 'block' : 'hidden'}
        md:flex items-center md:static md:h-fit md:w-fit md:space-x-10 md:space-y-0
      `}>
        <span className="absolute top-2 right-2 text-[#CCC] md:hidden" onClick={closeNavbar}><i className="fa-solid fa-xmark text-[35px]"></i></span>
        <li onClick={closeNavbar}><Link to="/">Home</Link></li>
        <li onClick={closeNavbar}><Link to="/product">Product</Link></li>
        <li onClick={closeNavbar}><Link to="/blog">Blog</Link></li>
        <li onClick={closeNavbar}><Link to="/chart">Chart</Link></li>
      </ul>
      <div className="w-fit md:pr-[20px]">
        <svg className="icon w-[20px]" viewBox="0 0 24 25" fill="none"><title>Toggle cart</title><path d="M2.90171 9.65153C3.0797 8.00106 4.47293 6.75 6.13297 6.75H17.867C19.527 6.75 20.9203 8.00105 21.0982 9.65153L22.1767 19.6515C22.3839 21.5732 20.8783 23.25 18.9454 23.25H5.05454C3.1217 23.25 1.61603 21.5732 1.82328 19.6515L2.90171 9.65153Z" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
          <path d="M7.19995 9.6001V5.7001C7.19995 2.88345 9.4833 0.600098 12.3 0.600098C15.1166 0.600098 17.4 2.88345 17.4 5.7001V9.6001" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
          <circle cx="7.19996" cy="10.2001" r="1.8" fill="currentColor"></circle>
          <ellipse cx="17.4" cy="10.2001" rx="1.8" ry="1.8" fill="currentColor"></ellipse>
        </svg>
      </div>
    </nav>
  )
}

export default Navbar;
