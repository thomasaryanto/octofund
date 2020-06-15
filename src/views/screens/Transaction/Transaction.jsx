//libraries
import React from "react";
import { Nav } from "react-bootstrap";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Transaction extends React.Component {
  render() {
    return (
      <section>
        <div className="w-100 p-5">
          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <h5>Thomas Aryanto</h5>
                  <p className="pt-2 text-muted">Total investasi</p>
                  <h5>Rp.2.120.000</h5>
                  <p className="pt-2 text-muted">Total imbal hasil</p>
                  <h5 className="pb-2">
                    Rp.120.000 <small>(+1,8%)</small>
                  </h5>

                  <hr />

                  <CustomButton
                    type="textual"
                    className="block borderless pt-2"
                  >
                    Profil
                  </CustomButton>

                  <CustomButton type="textual" className="block borderless">
                    Portfolio
                  </CustomButton>

                  <CustomButton type="textual" className="block borderless">
                    Transaksi
                  </CustomButton>

                  <CustomButton
                    type="textual"
                    className="block borderless pb-2"
                  >
                    Pengaturan
                  </CustomButton>

                  <hr />

                  <CustomButton
                    type="textual"
                    className="block borderless pt-2"
                  >
                    Keluar
                  </CustomButton>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <Nav
                    variant="pills"
                    defaultActiveKey="buy"
                    className="ml-lg-auto"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="buy">Pembelian</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="sell">Penjualan</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <hr />

                  <div className="card">
                    <div className="card-body pt-2">
                      <div className="row pb-3">
                        <div className="col-lg-12">
                          <p className="text-muted small">
                            16 Jun 2020, 00:52 WIB
                          </p>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-lg-1">
                          <p>logo</p>
                        </div>
                        <div className="col-lg-5">
                          <strong>TRIM Dana Kas 2</strong>
                          <p className="text-muted small">
                            PT. Trimegah Asset Management
                          </p>
                        </div>
                        <div className="col-lg-3">
                          <p className="text-muted small">Nilai transaksi</p>
                          <strong>Rp 202.000</strong>
                        </div>
                        <div className="col-lg-3">
                          <p className="text-muted small">Nomor transaksi</p>
                          <strong>2006160029</strong>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="float-left">
                            <p className="text-muted small">Status transaksi</p>
                            <strong>Menunggu pembayaran</strong>
                          </div>
                          <div className="float-right">
                            <CustomButton
                              type="contained"
                              className="small bg-primary borderless"
                            >
                              Lihat Detail
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Transaction;
