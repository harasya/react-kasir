import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';

import React from 'react';

export default function TotalBayar({ keranjangs }) {
  const totalBayar = keranjangs.reduce((result, item) => {
    return result + item.total_harga;
  }, 0);
  const history = useNavigate();
  const submitTotalBayar = () => {
    const payload = {
      total_bayar: totalBayar,
      menus: keranjangs
    };

    axios.post(`${API_URL}pesanans`, payload).then((res) => {
      history('/sukses');
    });
  };

  return (
    <div className='fixed-bottom'>
      <Row>
        <Col md={{ span: 3, offset: 9 }} className='px-4'>
          <h4>
            Total Harga :
            <strong className='float-end'>
              Rp. {numberWithCommas(totalBayar)}
            </strong>
          </h4>
          <div className='d-grid gap-2 mb-2'>
            <Button
              disabled={!keranjangs.length}
              variant='primary'
              size='lg'
              onClick={() => submitTotalBayar()}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
