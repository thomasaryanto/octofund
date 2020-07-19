//libraries
import React from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import ListCard from "../../components/Cards/ListCard";
import ManagerSideBar from "../../components/SideBar/ManagerSideBar";

class ManagerTransaction extends React.Component {
  state = {
    transactionData: [],
    transactionDataShow: false,
    rejectTransactionShow: false,
    rejectMsg: "",
    activeTransaction: {
      date: "",
      transactionStatus: {},
      mutualFund: {},
      member: {},
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
    Axios.get(
      `${API_URL}/transactions/manager/verify/${this.props.user.id}?page=${
        page - 1
      }&size=4`
    )
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

  convertDate = (timestamp) => {
    var date = timestamp.split(".");
    date = date[0].replace("T", " ");
    // date = date.split(/[- :]/);
    // var dateFix = new Date(
    //   date[0],
    //   date[1] - 1,
    //   date[2],
    //   date[3] || 0,
    //   date[4] || 0,
    //   date[5] || 0
    // );
    return date;
  };

  renderTransactions = () => {
    return this.state.transactionData.map(
      ({ id, date, mutualFund, totalPrice, paymentProof }) => {
        return (
          <ListCard
            image={paymentProof}
            textTop={this.convertDate(date)}
            textMiddle={mutualFund.name}
            textBottom={`Rp. ${totalPrice}`}
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
        console.log(err.response);
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
        <div className="container-fluid image">
          <div className="w-100 p-5">
            <div className="row">
              <ManagerSideBar />
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
        </div>

        <Modal
          size="lg"
          show={this.state.transactionDataShow}
          onHide={this.transactionDataToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Detail Transaksi</Modal.Title>
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
                    <p className="pb-3">
                      {this.state.activeTransaction.date
                        .split(".")[0]
                        .replace("T", " ")}
                    </p>
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
                    <br />
                    <a
                      href={this.state.activeTransaction.paymentProof}
                      target="_blank"
                    >
                      <img
                        src={this.state.activeTransaction.paymentProof}
                        width="200"
                        height="100"
                      />
                    </a>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ManagerTransaction);
