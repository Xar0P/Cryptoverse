import React from 'react';
import millify from 'millify';
import {
  Typography, Row, Col, Statistic,
} from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Cryptocurrencies, News } from '../../components';

const { Title } = Typography;

export interface GlobalStats {
  total: number,
  total24hVolume: string,
  totalCoins: number,
  totalExchanges: number,
  totalMarketCap: string,
  totalMarkets: number
}

const Homepage: React.FC = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats: GlobalStats = data?.data?.stats;

  if (isFetching) return <p>Loading...</p>;

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(Number(globalStats.totalMarketCap))} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(Number(globalStats.total24hVolume))} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
