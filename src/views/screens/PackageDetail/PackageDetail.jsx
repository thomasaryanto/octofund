//libraries
import React from "react";
import { Nav, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from "react-redux";
import Select from "react-select";
import { Helmet } from "react-helmet";

import { PieChart, Pie, Tooltip } from "recharts";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class PackageDetail extends React.Component {
  state = {
    mutualFundPackage: {
      id: 0,
      packageName: "",
      description: "",
      date: "",
      percentageOne: 0,
      percentageTwo: 0,
      percentageThree: 0,
      productOne: {},
      productTwo: {},
      productThree: {},
      manager: {
        id: 0,
        logo: "",
        website: "",
        companyName: "",
      },
    },
    chartData: [],
    totalBuy: 0,
    paymentFile: null,
    bankList: {},
    bankAccount: null,
    totalBuy: 100000,
    paymentShow: false,
  };

  componentDidMount() {
    this.getMutualFundPackageData();
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  fileChangeHandler = (e) => {
    this.setState({ paymentFile: e.target.files[0] });
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
    console.log(this.state);
    this.setState({ paymentShow: !this.state.paymentShow });
  };

  getMutualFundPackageData = () => {
    Axios.get(`${API_URL}/packages/${this.props.match.params.id}`)
      .then((res) => {
        this.setState(
          {
            mutualFundPackage: {
              ...res.data,
            },
          },
          () => {
            this.getBankList();
            this.getChartData();
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

  getChartData = () => {
    this.setState({
      chartData: [
        {
          name: this.state.mutualFundPackage.productOne.name,
          value: this.state.mutualFundPackage.percentageOne,
        },
        {
          name: this.state.mutualFundPackage.productTwo.name,
          value: this.state.mutualFundPackage.percentageTwo,
        },
        {
          name: this.state.mutualFundPackage.productThree.name,
          value: this.state.mutualFundPackage.percentageThree,
        },
      ],
    });
  };

  getBankList = () => {
    Axios.get(
      `${API_URL}/banks/accounts/user/${this.state.mutualFundPackage.manager.id}/all`
    )
      .then((res) => {
        this.setState({
          bankList: res.data.map(({ id, bank, accountNumber }) => ({
            id: id,
            name: bank.name + " - " + accountNumber,
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
    let formData = new FormData();

    const transactionData = {
      bankName: this.state.bankAccount.name,
      totalPrice: this.state.totalBuy,
      member: {
        id: this.props.user.id,
      },
    };

    formData.append(
      "file",
      this.state.paymentFile,
      this.state.paymentFile.name
    );
    formData.append("transactionData", JSON.stringify(transactionData));

    Axios.post(
      `${API_URL}/transactions/buy/package/${this.state.mutualFundPackage.id}`,
      formData
    )
      .then((res) => {
        swal(
          "Pembelian paket berhasil!",
          "Transaksi kamu kaan segera diproses oleh manajer investasi.",
          "success"
        ).then(() => {
          this.props.history.push(`/member/transaction`);
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  renderCustomizedLabel = ({ percent }) => {
    return (
      <text dominantBaseline="central">{`${(percent * 100).toFixed(0)}%`}</text>
    );
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
              <h1 className="white">
                {this.state.mutualFundPackage.packageName}
              </h1>
              <p className="white">
                {this.state.mutualFundPackage.manager.companyName}
              </p>
            </div>
          </section>
          <section>
            <div className="w-100 p-5">
              <div className="row">
                <div className="col-lg-6 p-3">
                  <div class="card shadow h-100">
                    <div class="card-header">
                      <p>Persentase Komposisi (%)</p>
                    </div>
                    <div className="card-body">
                      <div className="col-lg-12 text-center d-flex align-items-center justify-content-center">
                        <PieChart width={300} height={300}>
                          <Pie
                            dataKey="value"
                            data={this.state.chartData}
                            outerRadius={100}
                            fill="#FA5E6B"
                            label
                          />
                          <Tooltip />
                        </PieChart>
                      </div>
                    </div>
                  </div>
                </div>

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
                              <th scope="row">Nama Paket</th>
                              <td className="text-right">
                                {this.state.mutualFundPackage.packageName}
                              </td>
                            </tr>

                            <tr>
                              <th scope="row">Manajer Investasi</th>
                              <td className="text-right">
                                {
                                  this.state.mutualFundPackage.manager
                                    .companyName
                                }
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Tanggal Diluncurkan</th>
                              <td className="text-right">
                                {this.state.mutualFundPackage.date
                                  .split(".")[0]
                                  .replace("T", " ")}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Reksadana 1</th>
                              <td className="text-right">
                                <Link
                                  to={`/product/${this.state.mutualFundPackage.productOne.id}`}
                                >
                                  {this.state.mutualFundPackage.productOne.name}
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Harga Terakhir</th>
                              <td className="text-right">
                                Rp.{" "}
                                {
                                  this.state.mutualFundPackage.productOne
                                    .lastPrice
                                }
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Reksadana 2</th>
                              <td className="text-right">
                                <Link
                                  to={`/product/${this.state.mutualFundPackage.productTwo.id}`}
                                >
                                  {this.state.mutualFundPackage.productTwo.name}
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Harga Terakhir</th>
                              <td className="text-right">
                                Rp.{" "}
                                {
                                  this.state.mutualFundPackage.productTwo
                                    .lastPrice
                                }
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Reksadana 3</th>
                              <td className="text-right">
                                <Link
                                  to={`/product/${this.state.mutualFundPackage.productThree.id}`}
                                >
                                  {
                                    this.state.mutualFundPackage.productThree
                                      .name
                                  }
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Harga Terakhir</th>
                              <td className="text-right">
                                Rp.{" "}
                                {
                                  this.state.mutualFundPackage.productThree
                                    .lastPrice
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 p-3">
                  <div class="card shadow h-100">
                    <div class="card-header">
                      <p>Deskripsi</p>
                    </div>
                    <div className="card-body">
                      <p>{this.state.mutualFundPackage.description}</p>
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
            <Modal.Title>Konfirmasi Pembayaran</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Silahkan lakukan pembayaran sebesar Rp. {this.state.totalBuy} ke
              salah satu no rekening berikut dan upload bukti transfer.
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
            <br />
            <strong className="text-muted small">Pilih Bukti Transfer</strong>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={this.fileChangeHandler}
            />
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={this.buyBtnHandler}
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

export default connect(mapStateToProps)(PackageDetail);
