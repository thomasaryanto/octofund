//libraries
import React from "react";
import { Modal, Card, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import Select from "react-select";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import UserCard from "../../components/Cards/UserCard";

const bankAccountFormInit = {
  accountNumber: "",
  holderName: "",
  bank: null,
};

class ManagerBankAccount extends React.Component {
  state = {
    bankAccountData: [],
    addDataShow: false,
    editDataShow: false,
    activeBankAccount: {
      id: 0,
      accountNumber: "",
      holderName: "",
      bank: {
        id: 0,
        logo: "",
        name: "",
        shortName: "",
      },
    },
    bankAccountForm: {
      ...bankAccountFormInit,
    },
    bankList: {},
    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentDidMount() {
    this.getBankAccountListData(this.state.activePage);
  }

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  bankListHandler = (e, form) => {
    this.setState({
      [form]: {
        ...this.state[form],
        bank: {
          id: e.id,
          name: e.name,
        },
      },
    });
  };

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getBankAccountListData(this.state.activePage);
    });
  };

  getBankListData = () => {
    Axios.get(`${API_URL}/banks`)
      .then((res) => {
        this.setState({
          bankList: res.data.map(({ id, name }) => ({
            id,
            name,
          })),
        });
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;

        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getBankAccountListData = (page) => {
    Axios.get(`${API_URL}/banks/accounts/user/2?page=${page - 1}&size=2`)
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ bankAccountData: res.data.content }, () => {
          this.getBankListData();
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getBankAccountData = (id) => {
    Axios.get(`${API_URL}/banks/accounts/${id}`)
      .then((res) => {
        this.setState({
          activeBankAccount: {
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

  renderBankAccounts = () => {
    return this.state.bankAccountData.map(
      ({ id, accountNumber, holderName, bank }) => {
        return (
          <UserCard
            image={bank.logo}
            textTop={bank.name}
            textMiddle={holderName}
            textBottom={accountNumber}
            editClick={() => {
              this.editBtnHandler(id);
            }}
            deleteClick={() => {
              this.deleteBtnHandler(id);
            }}
          />
        );
      }
    );
  };

  editDataToggle = () => {
    this.setState({ editDataShow: !this.state.editDataShow });
  };

  editBtnHandler = (id) => {
    this.getBankAccountData(id);
    this.editDataToggle();
  };

  editProcessBtnHandler = () => {
    Axios.put(`${API_URL}/banks/accounts`, this.state.activeBankAccount)
      .then((res) => {
        swal("Berhasil!", "Rekening berhasil disunting!", "success");
        this.editDataToggle();
        this.getBankAccountListData();
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  addDataToggle = () => {
    this.setState({ addDataShow: !this.state.addDataShow });
  };

  addBtnHandler = () => {
    const bankAccountData = {
      ...this.state.bankAccountForm,
      user: {
        id: 2,
      },
    };
    Axios.post(`${API_URL}/banks/accounts`, bankAccountData)
      .then((res) => {
        swal("Berhasil!", "Rekening berhasil ditambahkan!", "success");
        this.addDataToggle();
        this.setState({
          bankAccountForm: {
            ...bankAccountFormInit,
          },
        });
        this.getBankAccountListData();
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  deleteBtnHandler = (id) => {
    swal({
      title: "Danger Zone!",
      text: "Kamu yakin akan menghapus data ini?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Axios.delete(`${API_URL}/banks/accounts/${id}`)
          .then((res) => {
            swal("Data berhasil dihapus!", {
              icon: "success",
            });
            this.getBankAccountListData();
          })
          .catch((err) => {
            const errorMessage = err.response
              ? err.response.data.errors.join("\n")
              : err.message;
            swal("Terjadi kesalahan!", errorMessage, "error");
          });
      } else {
        swal("Data batal dihapus!");
      }
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
                    <div className="row">
                      <div className="col-lg-10">
                        <h3>
                          Manajemen No Rekening{" "}
                          <span class="badge badge-pill badge-primary">
                            {this.state.totalItemsCount}
                          </span>
                        </h3>
                      </div>
                      <div className="col-lg-2">
                        <div className="float-right">
                          <CustomButton
                            type="contained"
                            className="small bg-primary borderless ml-2"
                            onClick={this.addDataToggle}
                          >
                            Tambah
                          </CustomButton>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <hr />
                        <div>{this.renderBankAccounts()}</div>
                        <hr />

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
          </div>
        </section>

        {/* Add Data Modal */}
        <Modal
          size="lg"
          show={this.state.addDataShow}
          onHide={this.addDataToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Tambah No Rekening</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <strong className="text-muted small">No Rekening</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.bankAccountForm.accountNumber}
                  onChange={(e) =>
                    this.inputHandler(e, "accountNumber", "bankAccountForm")
                  }
                />
                <br />
                <strong className="text-muted small">Nama Pemilik</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.bankAccountForm.holderName}
                  onChange={(e) =>
                    this.inputHandler(e, "holderName", "bankAccountForm")
                  }
                />
                <br />
                <strong className="text-muted small">Pilih Bank</strong>
                <Select
                  value={this.state.bankAccountForm.bank}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.bankListHandler(e, "bankAccountForm");
                  }}
                  options={this.state.bankList}
                  placeholder="Pilih Bank..."
                />
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="bg-primary borderless text-center ml-2"
              onClick={() => {
                this.addBtnHandler();
              }}
            >
              Tambah
            </CustomButton>
          </Modal.Footer>
        </Modal>

        {/* Edit Data Modal */}
        <Modal
          size="lg"
          show={this.state.editDataShow}
          onHide={this.editDataToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sunting No Rekening</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <strong className="text-muted small">No Rekening</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.activeBankAccount.accountNumber}
                  onChange={(e) =>
                    this.inputHandler(e, "accountNumber", "activeBankAccount")
                  }
                />
                <br />
                <strong className="text-muted small">Nama Pemilik</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.activeBankAccount.holderName}
                  onChange={(e) =>
                    this.inputHandler(e, "holderName", "activeBankAccount")
                  }
                />
                <br />
                <strong className="text-muted small">Pilih Bank</strong>
                <Select
                  value={this.state.activeBankAccount.bank}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.bankListHandler(e, "activeBankAccount");
                  }}
                  options={this.state.bankList}
                  placeholder="Pilih Bank..."
                />
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="bg-primary borderless text-center ml-2"
              onClick={() => {
                this.editProcessBtnHandler();
              }}
            >
              Ubah
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ManagerBankAccount;
