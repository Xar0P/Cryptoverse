import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
  Card, Row, Col, Input,
} from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoApi';

export interface Coin {
  uuid: number;
  '24hVolume': string,
  btcPrice: string,
  change: string,
  coinrankingUrl: string,
  color: string,
  iconUrl: string,
  listedAt: number,
  lowVolume: boolean,
  marketCap: string,
  name: string,
  price: string,
  rank: number,
  tier: number,
}

const Cryptocurrencies: React.FC<{ simplified?: boolean }> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins
      .filter((coin: Coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <p>Loading...</p>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: Coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={(
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="crypto"
                  />
              )}
                hoverable
              >
                <p>
                  Price:
                  {' '}
                  {millify(Number(currency.price))}
                </p>
                <p>
                  Market Cap:
                  {' '}
                  {millify(Number(currency.marketCap))}
                </p>
                <p>
                  Daily Change:
                  {' '}
                  {millify(Number(currency.change))}
                  %
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
