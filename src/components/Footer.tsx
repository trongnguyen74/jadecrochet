import { useTranslation } from "react-i18next";
import { SwitchLang } from "../components/SwitchLang";
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { ArrowRightOutlined, PercentageOutlined } from '@ant-design/icons';
import { useUserContext } from "../context/User";

export function FooterBar() {
  const { t } = useTranslation();
  const { loginWithRedirect, isAuthenticated } = useUserContext();

  return (
    <>
      <div className="h-[100px] bg-[#FFF]"></div>
      {
        !isAuthenticated && (
          <div className="flex flex-col md:flex-row items-center justify-evenly bg-[#fbdee0] h-[150px] md:h-[100px] montserrat">
            <span className="text-[25px] text-center uppercase">{t('become a member & get sale off')} <PercentageOutlined /></span>
            <button onClick={() => loginWithRedirect()} className="uppercase rounded-[6px] bg-[#333333] text-[#FFF] px-4 py-2">
              <Space>{t('Sign up for free')}<ArrowRightOutlined /></Space>
            </button>
          </div>
        )
      }
      <hr />
      <section className="bg-[#787777]">
          <div className="max-w-screen-xl px-4 py-4 mx-auto space-y-6 overflow-hidden sm:px-6 lg:px-8 montserrat">
              <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                  <div className="px-5 py-2">
                      <Link to="/store" className="text-base leading-6 text-[#FFF]">
                          {t('Store')}
                      </Link>
                  </div>
                  <div className="px-5 py-2">
                      <a href="#about" className="text-base leading-6 text-[#FFF]">
                          {t('About')}
                      </a>
                  </div>
                  <div className="px-5 py-2">
                      <Link to="/" className="text-base leading-6 text-[#FFF]">
                          {t('Privacy Policy')}
                      </Link>
                  </div>
                  <div className="px-5 py-2">
                      <Link to="/" className="text-base leading-6 text-[#FFF]">
                          {t('Terms & Conditions')}
                      </Link>
                  </div>
              </nav>
              <div className="flex justify-center mt-8 space-x-6">
                <button onClick={() => window.location.href='https://www.tiktok.com/@jade.crochet'} className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-tiktok"></i>
                </button>
                <button onClick={() => window.location.href='https://www.facebook.com/profile.php?id=100068345624353'} className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-facebook"></i>
                </button>
              </div>
              <p className="flex flex-col mt-8 text-base leading-6 text-center text-[#FFF] space-y-6">
                <div>Copyright © <span>{new Date().getFullYear()}</span><span className="text-blueGray-500"> Jade Crochet </span></div>
                <SwitchLang />
              </p>
          </div>
      </section>
    </>
  );
}
