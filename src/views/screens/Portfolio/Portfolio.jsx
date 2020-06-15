//libraries
import React from "react";
import { Accordion, Card } from "react-bootstrap";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Portfolio extends React.Component {
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
                  <h5>Rp.2.000.000</h5>
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
                  <div className="row">
                    <div className="col-lg-12">
                      <div class="card shadow-sm mb-4">
                        <div className="card-body p-3">
                          <div className="row">
                            <div className="col-lg-6">
                              <CustomText
                                className="small"
                                placeholder="Pencarian.."
                              />
                            </div>
                            <div className="col-lg-6 d-flex pt-3 pt-lg-0">
                              <div className="ml-lg-auto">
                                <CustomButton
                                  type="contained"
                                  className="small"
                                >
                                  ☰ Filter
                                </CustomButton>
                                <CustomButton
                                  type="contained"
                                  className="small ml-2"
                                >
                                  ↕ Sort
                                </CustomButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-1">
                          <p>logo</p>
                        </div>
                        <div className="col-lg-11">
                          <p className="text-muted small">Pasar Uang</p>
                          <strong>TRIM Dana Kas 2</strong>
                          <p className="text-muted small">
                            PT. Trimegah Asset Management
                          </p>
                          <div className="row pt-3">
                            <div className="col-lg-4">
                              <p className="text-muted small">Jumlah Unit</p>
                              <p className="pb-3">2740,76</p>

                              <p className="text-muted small">Nilai semula</p>
                              <p className="pb-3">Rp 2.000.000</p>
                            </div>
                            <div className="col-lg-4">
                              <p className="text-muted small">
                                Harga / unit terkahir
                              </p>
                              <p className="pb-3">Rp 1.484,02</p>

                              <p className="text-muted small">Nilai sekarang</p>
                              <p className="pb-3">Rp 2.120.000</p>
                            </div>
                            <div className="col-lg-4">
                              <p className="text-muted small">
                                Harga / unit rata-rata
                              </p>
                              <p className="pb-3">Rp 1.481,02</p>

                              <p className="text-muted small">Imbal hasil</p>
                              <p className="pb-3">
                                Rp 120.000 <small>(+1,8%)</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="float-right">
                        <CustomButton
                          type="contained"
                          className="small bg-primary borderless mr-2"
                        >
                          Jual
                        </CustomButton>

                        <CustomButton
                          type="contained"
                          className="small bg-primary borderless"
                        >
                          Beli Lagi
                        </CustomButton>
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

export default Portfolio;
