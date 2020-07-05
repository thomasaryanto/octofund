//libraries
import React from "react";
import { Link } from "react-router-dom";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Product extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center header image">
          <div className="w-100 p-5">
            <h1 className="white mt-5">Produk Reksa Dana</h1>
            <p className="white">Pilih reksa dana impianmu sekarang!</p>
          </div>
        </section>
        <section>
          <div className="w-100 p-5">
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
                          <CustomButton type="contained" className="small">
                            ☰ Filter
                          </CustomButton>
                          <CustomButton type="contained" className="small ml-2">
                            ↕ Sort
                          </CustomButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7">
                        <p className="pt-3 small">-- tempat chart --</p>
                      </div>
                      <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                        <div className="ml-lg-auto">
                          <h5>Rp 1.625,12</h5>
                          <p className="small text-success">+1,23%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/detail">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 2</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7">
                        <p className="pt-3 small">-- tempat chart --</p>
                      </div>
                      <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                        <div className="ml-lg-auto">
                          <h5>Rp 1.865,33</h5>
                          <p className="small text-danger">-2,35%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/detail">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 3</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7">
                        <p className="pt-3 small">-- tempat chart --</p>
                      </div>
                      <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                        <div className="ml-lg-auto">
                          <h5>Rp 2.139,66</h5>
                          <p className="small text-success">+4,13%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/detail">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7">
                        <p className="pt-3 small">-- tempat chart --</p>
                      </div>
                      <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                        <div className="ml-lg-auto">
                          <h5>Rp 1.625,12</h5>
                          <p className="small text-success">+1,23%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/detail">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 2</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7">
                        <p className="pt-3 small">-- tempat chart --</p>
                      </div>
                      <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                        <div className="ml-lg-auto">
                          <h5>Rp 1.865,33</h5>
                          <p className="small text-danger">-2,35%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/detail">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 3</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7">
                        <p className="pt-3 small">-- tempat chart --</p>
                      </div>
                      <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                        <div className="ml-lg-auto">
                          <h5>Rp 2.139,66</h5>
                          <p className="small text-success">+4,13%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/detail">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pb-5">
            <CustomButton type="contained">▼ Lebih Banyak</CustomButton>
          </div>
        </section>
      </div>
    );
  }
}

export default Product;
