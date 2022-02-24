import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Col, Row, Typography } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const { Title } = Typography;

interface CoinHistory {
  data: {
    change: string,
    history: {
      price: string,
      timestamp: number
    }[]
  }
}

const LineChart: React.FC<{
  coinHistory?: CoinHistory,
  currentPrice?: string,
  coinName?: string
}> = ({ coinHistory, currentPrice, coinName }) => {
  if (!coinHistory) return <p>Loading...</p>;

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = coinHistory?.data?.history?.length; i > 0; i -= 1) {
    coinPrice.push(coinHistory.data.history[i - 1].price);
    coinTimestamp
      .push(new Date(coinHistory.data.history[i - 1].timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      xAxis: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName}
          {' '}
          Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}
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
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
