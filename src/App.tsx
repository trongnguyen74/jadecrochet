import './App.css';
import {Routes,Route} from "react-router-dom";
import { Layout } from 'antd';
import Navbar from "./components/Navbar";
import FooterBar from "./components/Footer";
import Home from "./pages/Home";
import Chart from "./pages/Chart";
import Blog from "./pages/blog/Blog";
import BlogDetail from "./pages/blog/BlogDetail";
import ProductDetail from "./pages/store/ProductDetail";
import Store from "./pages/store/StoreList";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="min-h-[100vh]">
      <Header className="h-fit p-0">
        <Navbar />
      </Header>
      <Content>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/store" element={<Store />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/store/:title/:id" element={<ProductDetail />} />
            <Route path="/blog/:title/:id" element={<BlogDetail />} />
          </Routes>
        </main>
      </Content>
      <Footer className="h-fit p-0">
        <FooterBar />
      </Footer>
    </Layout>
  );
}

export default App;
