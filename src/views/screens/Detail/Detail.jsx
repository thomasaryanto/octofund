//libraries
import React from "react";
import { Nav } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Detail extends React.Component {
  state = {
    mutualFund: {
      id: 0,
      name: "",
      launchDate: "",
      minimumBuy: 0,
      totalFund: "",
      custodyBank: "",
      lastPrice: 0.0,
      prospectusFile: "",
      factsheetFile: "",
      priceHistory: [
        {
          date: "",
          price: 0.0,
        },
      ],
      manager: {
        logo: "",
        website: "",
        companyName: "",
      },
    },
  };

  componentDidMount() {
    this.getMutualFundData(this.props.match.params.id);
  }

  getMutualFundData = (id) => {
    Axios.get(`${API_URL}/mutualfund/${id}`)
      .then((res) => {
        this.setState({
          mutualFund: {
            ...res.data,
          },
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center header image">
          <div className="w-100 p-5">
            <h1 className="white">{this.state.mutualFund.name}</h1>
            <p className="white">{this.state.mutualFund.manager.companyName}</p>
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
                        <h2 className="pb-0 mb-0">
                          <strong>Rp {this.state.mutualFund.lastPrice} </strong>
                          <small class="text-muted"> / unit</small>
                        </h2>
                        <p>+1,23% dari hari kemarin</p>
                      </div>
                      <div className="col-lg-6 d-flex pt-3 pt-lg-0">
                        <Nav
                          variant="pills"
                          defaultActiveKey="minggu"
                          className="ml-lg-auto"
                        >
                          <Nav.Item>
                            <Nav.Link eventKey="minggu">Minggu</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="bulan">Bulan</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="tahun">Tahun</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="lima-tahun">5 Tahun</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 pb-5">
                        <h5 className="text-center pt-5 mt-5 pb-5">
                          -- tempat chart --
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 p-3">
                <div class="card shadow h-100">
                  <div class="card-header">
                    <p>Informasi</p>
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table table-sm table-borderless table-hover">
                        <tbody>
                          <tr>
                            <th scope="row">Jenis Reksa Dana</th>
                            <td className="text-right">Pendapatan Tetap</td>
                          </tr>
                          <tr>
                            <th scope="row">Tanggal Peluncuran</th>
                            <td className="text-right">
                              {this.state.mutualFund.launchDate}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Bank Kustodian</th>
                            <td className="text-right">
                              {this.state.mutualFund.custodyBank}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Dana Kelolaan</th>
                            <td className="text-right">
                              Rp {this.state.mutualFund.totalFund}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Minimal Pembelian</th>
                            <td className="text-right">
                              Rp {this.state.mutualFund.minimumBuy}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr />
                      <div className="text-center">
                        <CustomButton
                          type="contained"
                          className="small bg-primary borderless"
                        >
                          ▼ Prospectus
                        </CustomButton>
                        <CustomButton
                          type="contained"
                          className="small bg-primary borderless ml-2"
                        >
                          ▼ Fact Sheet
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 p-3">
                <div class="card shadow h-100">
                  <div class="card-header">
                    <p>Pembelian</p>
                  </div>
                  <div className="card-body text-center d-flex align-items-center justify-content-center">
                    <div className="col-lg-12">
                      <h4 className="mb-4">
                        Kamu ingin membeli berapa banyak?
                      </h4>
                      <Nav
                        variant="pills"
                        defaultActiveKey="1"
                        className="m-3 justify-content-center"
                      >
                        <Nav.Item>
                          <Nav.Link eventKey="1">Rp 100.000</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="2">Rp 200.000</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="3">Rp 500.000</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="4">Lainnya</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <CustomText value="100000" />
                      <CustomButton type="contained" className="mt-4 full">
                        Beli Sekarang
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Detail;
