import React from 'react';
// import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart: React.FC<{
  coinHistory: string,
  currentPrice: string,
  coinName: string
}> = ({ coinHistory, currentPrice, coinName }) => (
  <Row className="chart-header">
    <Title level={2} className="chart-title">
      {coinName}
      {' '}
      Price Chart
    </Title>
    <Col className="price-container">
      <Title level={5} className="price-change">
        {coinHistory}
        %
      </Title>
      <Title level={5} className="current-pricec">
        Current
        {' '}
        {coinName}
        {' '}
        Price: $
        {' '}
        {currentPrice}
      </Title>
    </Col>
  </Row>
);

export default LineChart;
