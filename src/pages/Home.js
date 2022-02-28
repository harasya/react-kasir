import { Col, Container, Row } from 'react-bootstrap';

import { Hasil, ListCategories, Menus } from '../components';
import React, { Component } from 'react';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import Swal from 'sweetalert2';
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriSelected: 'Makanan',
      keranjangs: []
    };
  }

  fetchProduct = (category) => {
    axios
      .get(`${API_URL}products?category.nama=${category}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchProduct(this.state.categoriSelected);
    this.getKeranjang();
  }

  //   componentDidUpdate(prevState) {
  //     if (this.state.keranjangs !== prevState.keranjangs) {
  //       this.getKeranjang();
  //     }
  //   }

  changeCategory = (value) => {
    this.setState({
      categoriSelected: value,
      menus: []
    });

    this.fetchProduct(value);
  };

  getKeranjang = () => {
    axios
      .get(`${API_URL}keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => console.log(err));
  };

  getKeranjangById = async (value) => {
    const res = await axios.get(`${API_URL}keranjangs?product.id=${value.id}`);

    return res.data;
  };

  addKeranjang = async (value) => {
    const checkKeranjang = await this.getKeranjangById(value);

    if (!checkKeranjang.length) {
      const payload = {
        jumlah: 1,
        total_harga: value.harga,
        product: value
      };
      axios
        .post(`${API_URL}keranjangs`, payload)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: `Sukses Masuk Keranjang ${value.nama}`,
            timer: 1000
          });

          this.getKeranjang();
        })
        .catch((err) => console.log(err));
    } else {
      const payload = {
        jumlah: checkKeranjang[0].jumlah + 1,
        total_harga: checkKeranjang[0].total_harga + value.harga,
        product: value
      };

      axios
        .put(`${API_URL}keranjangs/${checkKeranjang[0].id}`, payload)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: `Sukses Masuk Keranjang ${value.nama}`,
            timer: 1000
          });

          this.getKeranjang();
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { menus, categoriSelected, keranjangs } = this.state;

    return (
      <div className='mt-2'>
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categoriSelected={categoriSelected}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu, key) => (
                    <Menus
                      key={key}
                      menu={menu}
                      addKeranjang={this.addKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} />
          </Row>
        </Container>
      </div>
    );
  }
}
