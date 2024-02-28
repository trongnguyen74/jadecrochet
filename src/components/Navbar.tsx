import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Badge, Dropdown, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import { ShoppingOutlined, UserOutlined, MenuOutlined, CloseOutlined, LogoutOutlined } from '@ant-design/icons';
import { useCartContext } from "../context/Cart";
import { useUserContext } from "../context/User";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const {openCart, cartQuantity} = useCartContext();
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    {
      label: <a onClick={logout}><Space><LogoutOutlined />Logout</Space></a>,
      key: 'logout',
    },
  ];

  return (
    <nav>
      <div className="bg-[#FFF] montserrat" style={{boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)'}}>
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex items-center justify-between gap-x-8">
            <Link to="/" className="flex cursor-pointer items-center gap-x-1">
              <img width="80" height="80" className="object-cover" src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="logo" />
            </Link>
            <ul className="flex items-center gap-x-6 text-[18px]">
              <li className="hidden md:block">
                <Link to="/">{t('Home')}</Link>
              </li>
              <li className="hidden md:block">
                <Link to="/store">{t('Store')}</Link>
              </li>
              <li className="hidden md:block">
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
            <div className="flex items-center space-x-5">
              {
                (isAuthenticated) ? (
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <img className="w-8 h-8" src={user.picture}/>
                  </Dropdown>
                ):(
                  <Button icon={<UserOutlined />} onClick={() => loginWithRedirect()}></Button>
                )
              }
              <Badge count={cartQuantity}>
                <Button onClick={openCart} icon={<ShoppingOutlined />}></Button>
              </Badge>
              {
                (isOpen == true) ?
                <Button className="block md:text-[#FFF] cursor-default md:hidden" icon={<CloseOutlined />} onClick={() => setIsOpen(false)}></Button>
                : <Button className="block md:text-[#FFF] cursor-default md:hidden" icon={<MenuOutlined />} onClick={() => setIsOpen(true)}></Button>
              }
            </div>
          </div>
        </div>
        {
          (isOpen == true) && (
            <div x-ref="dropdown" className="duration-900 overflow-y-hidden transition-all text-center">
              <hr />
              <ul className="mx-auto max-w-screen-xl px-4 py-4 text-[20px] uppercase">
                <li onClick={() => setIsOpen(false)}>
                  <Link to="/">{t('Home')}</Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link to="/store">{t('Store')}</Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </div>
          )
        }
      </div>
    </nav>
  )
}
