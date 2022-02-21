import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout, Typography, Space } from 'antd';

import {
  Navbar,
  Homepage,
  Exchanges,
  Cryptocurrencies,
  Cryptodetails,
  News,
} from './components';
import store from './app/store';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="app">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="main">
            <Layout>
              <div className="routes">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/exchanges" element={<Exchanges />} />
                  <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
                  <Route path="/crypto/:coinId" element={<Cryptodetails />} />
                  <Route path="/news" element={<News />} />
                </Routes>
              </div>
            </Layout>
            <div className="footer">
              <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                Cryptoverse
                <br />
                All rights reserved
              </Typography.Title>
              <Space>
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
              </Space>
            </div>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
