//libraries
import React from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import Select from "react-select";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import PortfolioCard from "../../components/Cards/PortfolioCard";

class Portfolio extends React.Component {
  state = {
    portfolioData: [],
    activePortfolio: {
      mutualFund: {},
    },
    sellPortfolioShow: false,
    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
    bankList: {},
    bankAccount: null,
    totalSell: 0,
  };

  componentDidMount() {
    this.getPortfolioListData(this.state.activePage);
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

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getPortfolioListData(this.state.activePage);
    });
  };

  sellPortfolioToggle = () => {
    this.setState({ sellPortfolioShow: !this.state.sellPortfolioShow });
  };

  sellModalBtnHandler = (id) => {
    this.getPortfolioData(id);
    this.sellPortfolioToggle();
  };

  sellBtnHandler = () => {
    const transactionData = {
      productName: this.state.activePortfolio.mutualFund.name,
      managerName: this.state.activePortfolio.mutualFund.manager.companyName,
      bankName: this.state.bankAccount.name,
      totalPrice: this.state.totalSell,
      bankAccount: {
        ...this.state.bankAccount,
      },
      mutualFund: {
        id: this.state.activePortfolio.mutualFund.id,
      },
      member: {
        id: 1,
      },
    };
    Axios.post(`${API_URL}/transactions/sell`, transactionData)
      .then((res) => {
        swal(
          "Penjualan berhasil!",
          "Dana akan ditransfer ke rekening yg dipilih dalam maksimal 3 hari kerja.",
          "success"
        ).then(() => {
          this.props.history.push(`/transaction`);
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getPortfolioListData = (page) => {
    Axios.get(`${API_URL}/portfolios/member/1?page=${page - 1}&size=2`)
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ portfolioData: res.data.content }, () => {
          this.getBankList();
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getBankList = () => {
    Axios.get(`${API_URL}/banks/accounts/user/1/all`)
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

  getPortfolioData = (id) => {
    Axios.get(`${API_URL}/portfolios/${id}`)
      .then((res) => {
        this.setState({ activePortfolio: res.data });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  renderPortfolios = () => {
    return this.state.portfolioData.map((val) => {
      return (
        <PortfolioCard
          data={val}
          buyClick={() => {
            this.props.history.push(`/detail/${val.mutualFund.id}`);
          }}
          sellClick={() => {
            this.sellModalBtnHandler(val.id);
          }}
        />
      );
    });
  };

  render() {
    return (
      <>
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
                    {/* <div className="row">
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
                  </div> */}
                    <h3>
                      Portoflio Kamu{" "}
                      <span class="badge badge-pill badge-primary">
                        {this.state.totalItemsCount}
                      </span>
                    </h3>
                    <hr />

                    {this.renderPortfolios()}

                    <br />
                    <Pagination
                      hideDisabled
                      hideNavigation
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.itemsCountPerPage}
                      totalItemsCount={this.state.totalItemsCount}
                      pageRangeDisplayed={10}
                      itemClass="page-item"
                      linkClass="page-link"
                      innerClass="pagination justify-content-center"
                      onChange={this.pageChangeHandler.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal
          show={this.state.sellPortfolioShow}
          onHide={this.sellPortfolioToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Jual Reksadana</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <strong className="text-muted small">Jumlah Penjualan</strong>
            <CustomText
              type="text"
              value={this.state.totalSell}
              onChange={(e) => this.inputHandler(e, "totalSell")}
            />
            <br />
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
              onClick={this.sellBtnHandler}
            >
              Jual
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Portfolio;
