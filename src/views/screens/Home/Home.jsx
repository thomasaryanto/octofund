//libraries
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

//assets
import arrow from "../../../assets/images/arrow.png";

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center image">
          <div className="w-100">
            <h1 className="jumbo white">Investasi mulai di OctoFund</h1>
            <p className="white">
              Pionir platform investasi di Indonesia. Di OctoFund, investasi
              semudah belanja online!
            </p>
            <br />
            {this.props.user.id != 0 ? (
              <Link to="/product">
                <CustomButton
                  type="contained"
                  className="bg-primary borderless"
                >
                  Investasi Sekarang
                </CustomButton>
              </Link>
            ) : (
              <Link to="/register">
                <CustomButton
                  type="contained"
                  className="bg-primary borderless"
                >
                  Daftar Sekarang
                </CustomButton>
              </Link>
            )}

            <a class="btn-scroll" href="#more">
              <img alt="More" src={arrow} />
            </a>
          </div>
        </section>

        <section className="d-flex align-items-center" id="more">
          <div className="w-100 p-5">
            <h2>Kalkulator Investasi</h2>
            <div className="row">
              <div className="col-lg-4 pt-3">
                <p className="pt-2 pb-2">Jika kamu mulai</p>
                <CustomText />
                <p className="pt-2 pb-2">untuk investasi awal</p>

                <p className="pt-5 pb-2">Jika kamu berinvestasi</p>
                <CustomText />
                <p className="pt-2 pb-2">setiap bulan</p>
              </div>
              <div className="col-lg-8 pt-3 pl-lg-5">
                <p className="pt-2 pb-2 pl-lg-5">
                  Dalam waktu xx tahun kamu bisa mendapatkan
                </p>
                <br />
                <br />
                <br />
                <br />
                <p className="pl-lg-5">
                  <b> -- disini nanti ada chart --</b>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* 
        <section className="d-flex align-items-center image">
          <div className="w-100 p-5">
            <h2 className="white">Artikel Investasi</h2>

            <div className="row">
              <div className="col-lg-4 pt-3">
                <div class="card">
                  <div class="card-header d-flex">
                    <p class="mr-auto">Promosi</p>
                    <p>
                      <a href="#artikel">Lihat Semua</a>
                    </p>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-lg-3 d-none d-lg-block">
                        <img
                          src="https://picsum.photos/75"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-lg-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">hari ini</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-lg-3 d-none d-lg-block">
                        <img
                          src="https://picsum.photos/75"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-lg-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">kemarin</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-lg-3 d-none d-lg-block">
                        <img
                          src="https://picsum.photos/75"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-lg-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">16 April 2020</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 pt-3">
                <div class="card">
                  <div class="card-header d-flex">
                    <p class="mr-auto">Tips dan Trik</p>
                    <p>
                      <a href="#artikel">Lihat Semua</a>
                    </p>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="http://placeimg.com/75/75/any"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">hari ini</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="http://placeimg.com/75/75/any"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">kemarin</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="http://placeimg.com/75/75/any"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">16 April 2020</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 pt-3">
                <div class="card">
                  <div class="card-header d-flex">
                    <p class="mr-auto">Paling Populer</p>
                    <p>
                      <a href="#artikel">Lihat Semua</a>
                    </p>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="https://placekitten.com/75/75"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">hari ini</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="https://placekitten.com/75/75"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">kemarin</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="https://placekitten.com/75/75"
                          alt="Contoh Gambar"
                        />
                      </div>
                      <div className="col-9">
                        <h5 class="card-title">
                          Special title treatment with supporting text
                        </h5>
                        <p class="card-text small">16 April 2020</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Home);
