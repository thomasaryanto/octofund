//libraries
import React from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import UserCard from "../../components/Cards/UserCard";

class ManagerTransaction extends React.Component {
  state = {
    transactionData: [],
    transactionDataShow: false,
    rejectTransactionShow: false,
    rejectMsg: "",
    activeTransaction: {
      transactionStatus: {},
      mutualFund: {},
      member: {},
      bankAccount: {
        bank: {},
      },
    },

    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentDidMount() {
    this.getTransactionListData(this.state.activePage);
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getTransactionListData(this.state.activePage);
    });
  };

  getTransactionListData = (page) => {
    Axios.get(`${API_URL}/transactions/manager/2?page=${page - 1}&size=2`)
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ transactionData: res.data.content });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getTransactionData = (id) => {
    Axios.get(`${API_URL}/transactions/${id}`)
      .then((res) => {
        this.setState({ activeTransaction: res.data });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  renderTransactions = () => {
    return this.state.transactionData.map(
      ({ id, date, mutualFund, totalPrice, paymentProof }) => {
        return (
          <UserCard
            image={paymentProof}
            textTop={date}
            textMiddle={mutualFund.name}
            textBottom={totalPrice}
            editText="Proses"
            editClick={() => {
              this.proccessBtnHandler(id);
            }}
          />
        );
      }
    );
  };

  transactionDataToggle = () => {
    this.setState({ transactionDataShow: !this.state.transactionDataShow });
  };

  rejectTransactionToggle = () => {
    this.setState({ rejectTransactionShow: !this.state.rejectTransactionShow });
  };

  proccessBtnHandler = (id) => {
    this.getTransactionData(id);
    this.transactionDataToggle();
  };

  acceptBtnHandler = () => {
    const transactionData = {
      id: this.state.activeTransaction.id,
    };

    Axios.post(`${API_URL}/transactions/buy/accept`, transactionData)
      .then((res) => {
        swal("Berhasil!", res.data, "success");
        this.transactionDataToggle();
        this.getTransactionListData();
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  rejectBtnHandler = () => {
    if (this.state.rejectMsg == "") {
      return swal(
        "Terjadi kesalahan!",
        "Alasan penolakan harus diisi!",
        "error"
      );
    }

    const transactionData = {
      id: this.state.activeTransaction.id,
      rejectMessage: this.state.rejectMsg,
    };

    Axios.post(`${API_URL}/transactions/buy/reject`, transactionData)
      .then((res) => {
        swal("Berhasil!", res.data, "success");
        this.rejectTransactionToggle();
        this.getTransactionListData();
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
                    <h3>
                      Verifikasi Transaksi{" "}
                      <span class="badge badge-pill badge-primary">
                        {this.state.totalItemsCount}
                      </span>
                    </h3>
                    <hr />
                    <div>{this.renderTransactions()}</div>
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
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal
          size="lg"
          show={this.state.transactionDataShow}
          onHide={this.transactionDataToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Data Nasabah</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey="data">
              <Tab eventKey="data" title="Data Transaksi">
                <br />
                <div className="row">
                  <div className="col-lg-4">
                    <strong className="text-muted small">No Transaksi</strong>
                    <p className="pb-3">{this.state.activeTransaction.id}</p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">
                      Tanggal Transaksi
                    </strong>
                    <p className="pb-3">{this.state.activeTransaction.date}</p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">Nama Produk</strong>
                    <p className="pb-3">
                      {this.state.activeTransaction.mutualFund.name}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <strong className="text-muted small">
                      Manajer Investasi
                    </strong>
                    <p className="pb-3">
                      {this.state.activeTransaction.managerName}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">
                      Jumlah Transaksi
                    </strong>
                    <p className="pb-3">
                      Rp. {this.state.activeTransaction.totalPrice}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">
                      Tujuan Transfer
                    </strong>
                    <p className="pb-3">
                      {this.state.activeTransaction.bankName}
                    </p>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="photo" title="Bukti Transfer">
                <br />
                <div className="row">
                  <div className="col-lg-12">
                    <strong className="text-muted small">
                      File Bukti Transfer
                    </strong>
                    <img src={this.state.activeTransaction.paymentProof} />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={() => {
                this.transactionDataToggle();
                this.rejectTransactionToggle();
              }}
            >
              Tolak
            </CustomButton>
            <CustomButton
              type="contained"
              className="bg-primary borderless"
              onClick={() => {
                this.acceptBtnHandler();
              }}
            >
              Terima
            </CustomButton>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.rejectTransactionShow}
          onHide={this.rejectTransactionToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Tolak Transaksi</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <CustomText
              placeholder="Alasan penolakan"
              type="text"
              value={this.state.rejectMsg}
              onChange={(e) => this.inputHandler(e, "rejectMsg")}
            />
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={this.rejectBtnHandler}
            >
              Tolak
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ManagerTransaction;
