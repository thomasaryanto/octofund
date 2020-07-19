//libraries
import React from "react";
import { Nav, Modal } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from "react-redux";
import Select from "react-select";
import { Helmet } from "react-helmet";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
      limited: false,
      stock: 0,
      mutualFundCategory: {},
      mutualFundType: {},
      priceHistory: [
        {
          date: "",
          price: 0.0,
        },
      ],
      manager: {
        id: 0,
        logo: "",
        website: "",
        companyName: "",
      },
    },
    priceChart: [],
    percentYields: 0,
    positiveYields: false,
    bankList: {},
    bankAccount: null,
    totalBuy: 100000,
    paymentShow: false,
  };

  componentDidMount() {
    this.getMutualFundData();
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  bankAccountHandler = (e) => {
    this.setState({
      bankAccount: {
        id: e.id,
        name: e.name,
      },
    });
  };

  paymentToggle = () => {
    this.setState({ paymentShow: !this.state.paymentShow });
  };

  getMutualFundData = () => {
    Axios.get(`${API_URL}/mutualfund/${this.props.match.params.id}`)
      .then((res) => {
        this.setState(
          {
            mutualFund: {
              ...res.data,
            },
          },
          () => {
            this.getBankList();
            this.getPercentYields();
            this.setState({
              priceChart: [...this.state.mutualFund.priceHistory],
            });

            this.setState({
              priceChart: this.state.mutualFund.priceHistory.map(
                ({ date, price }) => ({
                  price,
                  date: date.split(".")[0].replace("T", " ").split(" ")[0],
                })
              ),
            });
          }
        );
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        this.props.history.push("/");
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getPercentYields = () => {
    const countPercentYields = Math.abs(
      (
        ((this.state.mutualFund.priceHistory[
          this.state.mutualFund.priceHistory.length - 2
        ].price -
          this.state.mutualFund.priceHistory[
            this.state.mutualFund.priceHistory.length - 1
          ].price) /
          this.state.mutualFund.priceHistory[
            this.state.mutualFund.priceHistory.length - 2
          ].price) *
        100
      ).toFixed(2)
    );

    const positiveYields =
      this.state.mutualFund.priceHistory[
        this.state.mutualFund.priceHistory.length - 2
      ].price -
        this.state.mutualFund.priceHistory[
          this.state.mutualFund.priceHistory.length - 1
        ].price <=
      0
        ? true
        : false;

    this.setState({
      percentYields: countPercentYields,
      positiveYields: positiveYields,
    });
  };

  getBankList = () => {
    Axios.get(
      `${API_URL}/banks/accounts/user/${this.state.mutualFund.manager.id}/all`
    )
      .then((res) => {
        this.setState({
          bankList: res.data.map(({ id, bank, accountNumber, holderName }) => ({
            id: id,
            name: bank.name + " - " + accountNumber + " - " + holderName,
          })),
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  buyBtnHandler = () => {
    if (this.state.bankAccount == null) {
      return swal("Terjadi kesalahan!", "Bank harus dipilih!", "error");
    }
    const transactionData = {
      productName: this.state.mutualFund.name,
      managerName: this.state.mutualFund.manager.companyName,
      bankName: this.state.bankAccount.name,
      totalPrice: this.state.totalBuy,
      memberName: this.props.user.name,
      mutualFund: {
        id: this.state.mutualFund.id,
      },
      member: {
        id: this.props.user.id,
      },
    };
    Axios.post(`${API_URL}/transactions/buy`, transactionData)
      .then((res) => {
        swal(
          "Pembelian berhasil!",
          "Silahkan lakukan pembayaran dan konfirmasi untuk melanjutkan.",
          "success"
        ).then(() => {
          this.props.history.push(`/payment/${res.data.id}`);
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
      <>
        <Helmet>
          <style>{"body { background: #f4f5f4 !important; }"}</style>
        </Helmet>
        <div className="container-fluid p-0">
          <section className="d-flex align-items-center text-center header image">
            <div className="w-100 p-5">
              <h1 className="white">{this.state.mutualFund.name}</h1>
              <p className="white">
                {this.state.mutualFund.manager.companyName}
              </p>
            </div>
          </section>
          <section>
            <div className="w-100 p-5">
              <div className="row">
                <div className="col-lg-12">
                  <div class="card shadow-sm mb-4">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-lg-9">
                          <h2 className="pb-0 mb-0">
                            <strong>
                              Rp {this.state.mutualFund.lastPrice}{" "}
                            </strong>
                            <small class="text-muted"> / unit</small>
                          </h2>
                        </div>
                        <div className="col-lg-3 d-flex pt-3 pt-lg-0">
                          <div class="ml-auto">
                            <strong>
                              {this.state.positiveYields ? (
                                <p className="text-success">
                                  +{this.state.percentYields}% dari hari kemarin
                                </p>
                              ) : (
                                <p className="text-danger">
                                  -{this.state.percentYields}% dari hari kemarin
                                </p>
                              )}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 pb-5">
                          <br />
                          <div style={{ width: "100%", height: 300 }}>
                            <ResponsiveContainer>
                              <AreaChart
                                data={this.state.priceChart}
                                margin={{
                                  top: 10,
                                  right: 30,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                  type="monotone"
                                  dataKey="price"
                                  stroke="#8884d8"
                                  fill="#8884d8"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
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
                              <th scope="row">Tipe Reksadana</th>
                              <td className="text-right">
                                {" "}
                                {this.state.mutualFund.mutualFundType.name}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Jenis Reksadana</th>
                              <td className="text-right">
                                {this.state.mutualFund.mutualFundCategory.name}
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
                            {this.state.mutualFund.limited ? (
                              <tr>
                                <th scope="row">Sisa Stok</th>
                                <td className="text-right">
                                  {this.state.mutualFund.stock.toFixed(2)} unit
                                </td>
                              </tr>
                            ) : null}
                          </tbody>
                        </table>
                        <hr />
                        <div className="text-center">
                          <a href={this.state.mutualFund.prospectusFile}>
                            <CustomButton
                              type="contained"
                              className="small bg-primary borderless"
                            >
                              ▼ Prospectus
                            </CustomButton>
                          </a>
                          <a href={this.state.mutualFund.factsheetFile}>
                            <CustomButton
                              type="contained"
                              className="small bg-primary borderless ml-2"
                            >
                              ▼ Fact Sheet
                            </CustomButton>
                          </a>
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
                            <Nav.Link
                              eventKey="1"
                              onClick={() => {
                                this.setState({ totalBuy: 100000 });
                              }}
                            >
                              Rp 100.000
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="2"
                              onClick={() => {
                                this.setState({ totalBuy: 200000 });
                              }}
                            >
                              Rp 200.000
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="3"
                              onClick={() => {
                                this.setState({ totalBuy: 500000 });
                              }}
                            >
                              Rp 500.000
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="4"
                              onClick={() => {
                                this.setState({ totalBuy: 0 });
                              }}
                            >
                              Lainnya
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <CustomText
                          type="number"
                          value={this.state.totalBuy}
                          onChange={(e) => this.inputHandler(e, "totalBuy")}
                        />
                        {this.props.user.role.id == 3 ? (
                          <CustomButton
                            type="contained"
                            className="mt-4 full"
                            onClick={
                              this.props.user.kyc
                                ? this.paymentToggle
                                : () => {
                                    swal(
                                      "Terjadi kesalahan!",
                                      "Akun kamu masih menunggu hasil verifikasi data diri.",
                                      "error"
                                    );
                                  }
                            }
                          >
                            Beli Sekarang
                          </CustomButton>
                        ) : (
                          <CustomButton
                            type="textual"
                            className="mt-4 full"
                            onClick={() => {
                              this.props.history.push(`/login`);
                            }}
                          >
                            Masuk untuk membeli
                          </CustomButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Modal show={this.state.paymentShow} onHide={this.paymentToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Pilih Pembayaran</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Kamu akan melakukan pembelian reksadana{" "}
              {this.state.mutualFund.name} sebesar Rp. {this.state.totalBuy}
            </p>
            <hr />
            <strong className="text-muted small">Pilih Tujuan Transfer</strong>
            <Select
              value={this.state.bankAccount}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              onChange={this.bankAccountHandler}
              options={this.state.bankList}
              placeholder="Pilih Bank..."
            />
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={this.buyBtnHandler}
              disabled
            >
              Beli
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Detail);
