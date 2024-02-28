import './App.css';

import { Routes,Route } from "react-router-dom";
import { Layout } from 'antd';

import {Navbar} from "./components/Navbar";
import {FooterBar} from "./components/Footer";
import {Cart} from "./components/Cart";
import Home from "./pages/Home";
import Chart from "./pages/Chart";
import Blog from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";
import ProductList from "./pages/store/ProductList";
import ProductDetail from "./pages/store/ProductDetail";
import Checkout from "./pages/store/Checkout";
import CheckoutSuccess from "./pages/store/CheckoutSuccess";

import { CartProvider } from "./context/Cart";
import { UserProvider } from "./context/User";
import { ProductProvider } from "./context/Product";

const { Header, Content, Footer } = Layout;

function App() {

  return (
    <CartProvider>
    <UserProvider>
    <ProductProvider>
      <Layout className="min-h-[100vh]">
        <Cart />
        <Header className="sticky top-0 p-0 z-[10]">
          <Navbar />
        </Header>
        <Content className="bg-[#FFF] m-0 z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/blog/:title/:id" element={<BlogDetail />} />
            <Route path="/store" element={<ProductList />} />
            <Route path="/store/:title/:id" element={<ProductDetail />} />
            <Route path="/store/checkout" element={<Checkout />} />
            <Route path="/store/checkout-success" element={<CheckoutSuccess />} />
          </Routes>
        </Content>
        <Footer className="h-fit p-0">
          <FooterBar />
        </Footer>
      </Layout>
    </ProductProvider>
    </UserProvider>
    </CartProvider>
  );
}

export default App;
