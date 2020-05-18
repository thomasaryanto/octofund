//libraries
import React from "react";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Product extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center header image">
          <div className="w-100 p-5">
            <h1 className="white">Produk Reksa Dana</h1>
            <p className="white">Pilih reksa dana impianmu sekarang!</p>
          </div>
        </section>
        <section>
          <div className="w-100 p-5">
            <div className="row">
              <div className="col-12">
                <div class="card shadow-sm mb-4">
                  <div className="card-body d-flex p-3">
                    <div className="col-md-6">
                      <CustomText className="small" placeholder="Pencarian.." />
                    </div>
                    <div className="col-md-6 d-flex">
                      <div className="ml-auto">
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
              <div className="col-md-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body d-flex">
                    <p className="pt-3 small">-- tempat chart --</p>
                    <div className="ml-auto">
                      <h5>Rp 1.625,12</h5>
                      <p className="small text-success">+1,23%</p>
                    </div>
                  </div>
                  <a href="#buy" className="text-decoration-none">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 2</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body d-flex">
                    <p className="pt-3 small">-- tempat chart --</p>
                    <div className="ml-auto">
                      <h5>Rp 1.850,31</h5>
                      <p className="small text-danger">-2,35%</p>
                    </div>
                  </div>
                  <a href="#buy" className="text-decoration-none">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 3</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body d-flex">
                    <p className="pt-3 small">-- tempat chart --</p>
                    <div className="ml-auto">
                      <h5>Rp 2.189,15</h5>
                      <p className="small text-success">+4,23%</p>
                    </div>
                  </div>
                  <a href="#buy" className="text-decoration-none">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body d-flex">
                    <p className="pt-3 small">-- tempat chart --</p>
                    <div className="ml-auto">
                      <h5>Rp 1.625,12</h5>
                      <p className="small text-success">+1,23%</p>
                    </div>
                  </div>
                  <a href="#buy" className="text-decoration-none">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 2</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body d-flex">
                    <p className="pt-3 small">-- tempat chart --</p>
                    <div className="ml-auto">
                      <h5>Rp 1.850,31</h5>
                      <p className="small text-danger">-2,35%</p>
                    </div>
                  </div>
                  <a href="#buy" className="text-decoration-none">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-4 p-3">
                <div class="card shadow">
                  <div class="card-header">
                    <p>TRIM Dana Tetap 3</p>
                    <p className="small">PT. Trimegah Asset Management</p>
                  </div>
                  <div className="card-body d-flex">
                    <p className="pt-3 small">-- tempat chart --</p>
                    <div className="ml-auto">
                      <h5>Rp 2.189,15</h5>
                      <p className="small text-success">+4,23%</p>
                    </div>
                  </div>
                  <a href="#buy" className="text-decoration-none">
                    <div class="card-footer bg-primary text-center white">
                      <strong>BELI</strong>
                    </div>
                  </a>
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
