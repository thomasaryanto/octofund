//libraries
import React from "react";
import { Nav, Modal } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import TransactionCard from "../../components/Cards/TransactionCard";
import MemberSideBar from "../../components/SideBar/MemberSideBar";

class MemberTransaction extends React.Component {
  state = {
    transactionData: [],
    transactionDataShow: false,
    activeTransaction: {
      transactionStatus: {},
      mutualFund: {},
      member: {},
      bankAccount: {
        bank: {},
      },
    },
    activeTab: 1,
    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentDidMount() {
    this.getTransactionListData(this.state.activeTab, this.state.activePage);
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  tabHandler = (type) => {
    this.setState({ activePage: 1, activeTab: type }, () => {
      this.getTransactionListData(this.state.activeTab, this.state.activePage);
    });
  };

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getTransactionListData(this.state.activeTab, this.state.activePage);
    });
  };

  getTransactionListData = (type, page) => {
    Axios.get(`${API_URL}/transactions/member/${type}/1`, {
      params: {
        page: page - 1,
        size: 2,
        sortKey: "id",
        sortType: "desc",
      },
    })
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
    return this.state.transactionData.map((val) => {
      return (
        <TransactionCard
          data={val}
          onClick={() => this.detailBtnHandler(val.id)}
        />
      );
    });
  };

  transactionDataToggle = () => {
    this.setState({ transactionDataShow: !this.state.transactionDataShow });
  };

  detailBtnHandler = (id) => {
    this.getTransactionData(id);
    this.transactionDataToggle();
  };

  render() {
    return (
      <>
        <div className="container-fluid image">
          <div className="w-100 p-5">
            <div className="row">
              <MemberSideBar />

              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body">
                    <h3>
                      Histori Transaksi{" "}
                      <span class="badge badge-pill badge-primary">
                        {this.state.totalItemsCount}
                      </span>
                    </h3>
                    <hr />

                    <Nav
                      variant="pills"
                      defaultActiveKey="buy"
                      className="ml-lg-auto"
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="buy"
                          onClick={() => this.tabHandler(1)}
                        >
                          Pembelian
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="sell"
                          onClick={() => this.tabHandler(2)}
                        >
                          Penjualan
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <hr />

                    {this.renderTransactions()}

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
            <div className="row">
              <div className="col-lg-4">
                <strong className="text-muted small">No Transaksi</strong>
                <p className="pb-3">{this.state.activeTransaction.id}</p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Tanggal Transaksi</strong>
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
                <strong className="text-muted small">Manajer Investasi</strong>
                <p className="pb-3">
                  {this.state.activeTransaction.managerName}
                </p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Jumlah Transaksi</strong>
                <p className="pb-3">
                  Rp. {this.state.activeTransaction.totalPrice}
                </p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Jumlah Unit</strong>
                <p className="pb-3">
                  {this.state.activeTransaction.totalUnit > 0
                    ? this.state.activeTransaction.totalUnit.toFixed(2)
                    : "Belum Tersedia"}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col lg-4">
                <strong className="text-muted small">Tujuan Transfer</strong>
                <p className="pb-3">{this.state.activeTransaction.bankName}</p>
              </div>
              <div className="col-lg-8">
                <strong className="text-muted small">Status</strong>
                <p className="pb-3">
                  {this.state.activeTransaction.transactionStatus.name}
                </p>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            {this.state.activeTransaction.transactionStatus.id == 1 ||
            this.state.activeTransaction.transactionStatus.id == 3 ? (
              <CustomButton
                type="contained"
                className="bg-primary borderless"
                onClick={() => {
                  this.props.history.push(
                    `/payment/${this.state.activeTransaction.id}`
                  );
                }}
              >
                Konfirmasi Pembayaran
              </CustomButton>
            ) : null}

            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={() => {
                this.transactionDataToggle();
              }}
            >
              Tutup
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MemberTransaction;
