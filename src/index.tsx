import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Trang chủ": "Home",
          "Cửa hàng": "Store",
          "Chính sách": "Privacy Policy",
          "Điều khoản và điều kiện" : "Terms & Conditions",
          "Liên hệ": "Contact us",
          "Sản phẩm mới nhất": "The latest",
          "Bán chạy nhất": "The best seller",
          "Bộ lọc": "Filter",
          "Thấp": "Low",
          "Cao" : "High",
          "Mới nhất": "Newest",
          "Giảm giá": "Sale",
          "Đã bán": "Sold",
          "Thêm giỏ hàng" : "Add to cart",
          "Đã hết hàng" : "Out of stock",
          "Mô tả" : "Description",
          "Chia sẻ với" : "Share with",
          "Giỏ hàng" : "Shopping cart",
          "Tổng tiền": "Total",
          "Thanh toán": "Checkout",
          "Đã Thêm giỏ hàng": "Successfully add to cart",
          "Chưa bao gồm phí vận chuyển": "Shipping fees not included",
          "Thông tin đơn hàng" : "Order summary",
          "Giỏ hàng đang trống": "There are no items in your cart",
          "Mua sắm ngay" : "Shopping now",
          "Số lượng": "Amount",
          "Thông tin thanh toán" : "Payment details",
          "Địa chỉ giao hàng" : "Billing address",
          "Tổng tiền sản phẩm" : "Subtotal",
          "Phí vận chuyển": "Shipping",
          "Số nhà, tên đường": "Street address",
          "Phường": "Ward",
          "Quận": "District",
          "Thành phố": "City",
          "Số điện thoại": "Phone",
          "Đặt hàng": "Place order",
          "Đặt hàng thành công": "Successfully Purchased",
          "Tiếp tục mua sắm": "Buy Again",
          "Vui lòng nhập": "Please input",
          "Đăng kí ngay": "Sign up for free",
          "Trở thành hội viên để nhận ưu đãi": "become a member & get sale off",
          "Về chúng tôi" : "About",
          "Chào mừng bạn đến với Jade Crochet, điểm đến hàng đầu của bạn cho các sản phẩm đan crochet tinh xảo và nội dung blog sâu sắc. Khám phá bộ sưu tập được chọn lọc của chúng tôi với các sản phẩm crochet thủ công, được chăm chút cẩn thận để nâng cao phong cách và sự thoải mái của bạn. Tham gia cộng đồng sôi động của chúng tôi với những người yêu thích đan crochet khi chúng tôi chia sẻ mẹo, hướng dẫn và cảm hứng để kích thích đam mê của bạn với nghệ thuật đan.": "Welcome to Jade Crochet, your premier destination for exquisite crochet creations and insightful blog content. Explore our curated collection of handcrafted crochet products, meticulously crafted to elevate your style and comfort. Join our vibrant community of crochet enthusiasts as we share tips, tutorials, and inspiration to ignite your passion for the art of crochet."
        }
      },
      vi: {
        translation: {
          "Home": "Trang chủ",
          "Store": "Cửa hàng",
          "Privacy Policy": "Chính sách",
          "Terms & Conditions" : "Điều khoản & điều kiện",
          "Contact us": "Liên hệ",
          "The latest": "Sản phẩm mới nhất",
          "The best seller": "Bán chạy nhất",
          "Visit my store" : "Xem cửa hàng",
          "Add to cart" : "Thêm giỏ hàng",
          "Out of stock" : "Đã hết hàng",
          "Filter": "Bộ lọc",
          "Low": "Thấp",
          "High" : "Cao",
          "Newest": "Mới nhất",
          "Sale": "Giảm giá",
          "Sold": "Đã bán",
          "Description" : "Mô tả",
          "Share with" : "Chia sẻ với",
          "Shopping cart" : "Giỏ hàng",
          "Total": "Tổng tiền",
          "Checkout": "Thanh toán",
          "Successfully add to cart": "Đã thêm vào giỏ hàng",
          "Shipping fees not included": "Chưa bao gồm phí vận chuyển",
          "Shopping now" : "Mua sắm ngay",
          "There are no items in your cart": "Giỏ hàng đang trống",
          "Amount": "Số lượng",
          "Order summary" : "Thông tin đơn hàng",
          "Payment details" : "Thông tin thanh toán",
          "Billing address" : "Địa chỉ giao hàng",
          "Subtotal" : "Tổng tiền sản phẩm",
          "Shipping": "Phí vận chuyển",
          "Street address": "Số nhà, tên đường",
          "Ward": "Phường",
          "District": "Quận",
          "City": "Thành phố",
          "Phone": "Số điện thoại",
          "Place order": "Đặt hàng",
          "Successfully Purchased": "Đặt hàng thành công",
          "Buy Again": "Tiếp tục mua sắm",
          "Please input": "Vui lòng nhập",
          "Sign up for free": "Đăng kí miễn phí",
          "become a member & get sale off": "Trở thành hội viên để nhận ưu đãi",
          "About" : "Về chúng tôi",
          "Welcome to Jade Crochet, your premier destination for exquisite crochet creations and insightful blog content. Explore our curated collection of handcrafted crochet products, meticulously crafted to elevate your style and comfort. Join our vibrant community of crochet enthusiasts as we share tips, tutorials, and inspiration to ignite your passion for the art of crochet.":"Chào mừng bạn đến với Jade Crochet, điểm đến hàng đầu của bạn cho các sản phẩm đan crochet tinh xảo và nội dung blog sâu sắc. Khám phá bộ sưu tập được chọn lọc của chúng tôi với các sản phẩm crochet thủ công, được chăm chút cẩn thận để nâng cao phong cách và sự thoải mái của bạn. Tham gia cộng đồng sôi động của chúng tôi với những người yêu thích đan crochet khi chúng tôi chia sẻ mẹo, hướng dẫn và cảm hứng để kích thích đam mê của bạn với nghệ thuật đan."
        }
      }
    },
    lng: "vi",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-z4vjntztkmkzsour.us.auth0.com"
          clientId="DgUdY8nSeZkpKlSLNDpJiyacuvNRdAar"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "https://dev-z4vjntztkmkzsour.us.auth0.com/api/v2/",
            scope: "read:current_user openid profile email phone"
          }}
          useRefreshTokens={true}
          cacheLocation="localstorage"
        >
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Auth0Provider>
      </BrowserRouter>
    </React.StrictMode>
);
