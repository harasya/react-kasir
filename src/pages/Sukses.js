import axios from 'axios';
import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(`${API_URL}keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map((keranjang) => {
          return axios.delete(`${API_URL}keranjangs/${keranjang.id}`);
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className='mt-4 text-center'>
        <Image src='assets/images/success.svg' width='500' />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant='success' as={Link} to='/'>
          Kembali
        </Button>
      </div>
    );
  }
}
