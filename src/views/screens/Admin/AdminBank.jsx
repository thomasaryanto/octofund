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
import AdminSideBar from "../../components/SideBar/AdminSideBar";

const bankFormInit = {
  name: "",
  shortName: "",
  logo: "",
};

class AdminBank extends React.Component {
  state = {
    bankData: [],
    addDataShow: false,
    editDataShow: false,
    activeBank: {
      id: 0,
      name: "",
      shortName: "",
      logo: "",
    },
    bankForm: {
      ...bankFormInit,
    },
    logoForm: "",
    logoFile: "",
    editLogoFile: "",
    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentDidMount() {
    this.getBankListData(this.state.activePage);
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

  logoHandler = (e, field) => {
    this.setState(
      {
        [field]: e.target.files[0],
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.logoFile);

        Axios.post(`${API_URL}/banks/upload/`, data)
          .then((res) => {
            this.setState({
              logoForm: res.data.fileName,
            });
          })
          .catch((err) => {
            const errorMessage = err.response
              ? err.response.data.errors.join("\n")
              : err.message;
            swal("Terjadi kesalahan!", errorMessage, "error");
          });
      }
    );
  };

  editLogoHandler = (e, field) => {
    this.setState(
      {
        [field]: e.target.files[0],
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.editLogoFile);

        Axios.post(`${API_URL}/banks/upload/${this.state.activeBank.id}/`, data)
          .then((res) => {})
          .catch((err) => {
            const errorMessage = err.response
              ? err.response.data.errors.join("\n")
              : err.message;
            swal("Terjadi kesalahan!", errorMessage, "error");
          });
      }
    );
  };

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getBankListData(this.state.activePage);
    });
  };

  getBankListData = (page) => {
    Axios.get(`${API_URL}/banks/paging`, {
      params: {
        page: page - 1,
        size: 4,
      },
    })
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ bankData: res.data.content });
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;

        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getBankData = (id) => {
    Axios.get(`${API_URL}/banks/${id}`)
      .then((res) => {
        this.setState({
          activeBank: {
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

  renderBanks = () => {
    return this.state.bankData.map(({ id, name, shortName, logo }) => {
      return (
        <ListCard
          image={logo}
          textTop={name}
          textBottom={shortName}
          editClick={() => {
            this.editBtnHandler(id);
          }}
          deleteClick={() => {
            this.deleteBtnHandler(id);
          }}
        />
      );
    });
  };

  editDataToggle = () => {
    this.setState({ editDataShow: !this.state.editDataShow, editLogoFile: "" });
  };

  editBtnHandler = (id) => {
    this.getBankData(id);
    this.editDataToggle();
  };

  editProcessBtnHandler = () => {
    Axios.put(`${API_URL}/banks`, this.state.activeBank)
      .then((res) => {
        swal("Berhasil!", "Bank berhasil disunting!", "success");
        this.editDataToggle();
        this.getBankListData();
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
    const bankData = {
      ...this.state.bankForm,
      logo: this.state.logoForm,
    };
    Axios.post(`${API_URL}/banks`, bankData)
      .then((res) => {
        swal("Berhasil!", "Bank berhasil ditambahkan!", "success");
        this.addDataToggle();
        this.setState({
          bankForm: {
            ...bankFormInit,
          },
          logoFile: "",
          logoForm: "",
        });
        this.getBankListData();
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
      text:
        "Kamu yakin akan menghapus data ini? Menghapus bank akan mengahapus seluruh rekening dalam bank tersebut.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Axios.delete(`${API_URL}/banks/${id}`)
          .then((res) => {
            swal("Data berhasil dihapus!", {
              icon: "success",
            });
            this.getBankListData();
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
        <div className="container-fluid image">
          <div className="w-100 p-5">
            <div className="row">
              <AdminSideBar />
              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-10">
                        <h3>
                          Manajemen Bank{" "}
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
                        <div>{this.renderBanks()}</div>
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
        </div>

        {/* Add Data Modal */}
        <Modal
          size="lg"
          show={this.state.addDataShow}
          onHide={this.addDataToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Tambah Bank</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <strong className="text-muted small">Nama Bank</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.bankForm.name}
                  onChange={(e) => this.inputHandler(e, "name", "bankForm")}
                />
                <br />
                <strong className="text-muted small">Nama Pendek</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.bankForm.shortName}
                  onChange={(e) =>
                    this.inputHandler(e, "shortName", "bankForm")
                  }
                />
                <br />
                <strong className="text-muted small">Logo</strong>
                <br />
                {this.state.logoForm ? (
                  <b>Upload berhasil!</b>
                ) : (
                  <input
                    type="file"
                    className="mb-3"
                    accept="image/*"
                    onChange={(e) => this.logoHandler(e, "logoFile")}
                  />
                )}
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
            <Modal.Title>Sunting Bank</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey="data">
              <Tab eventKey="data" title="Data Bank">
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <strong className="text-muted small">Nama Bank</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeBank.name}
                      onChange={(e) =>
                        this.inputHandler(e, "name", "activeBank")
                      }
                    />
                    <br />
                    <strong className="text-muted small">Nama Pendek</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeBank.shortName}
                      onChange={(e) =>
                        this.inputHandler(e, "shortName", "activeBank")
                      }
                    />
                  </div>
                </div>
              </Tab>

              <Tab eventKey="logo" title="Logo Bank">
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <strong className="text-muted small">Ubah Logo Bank</strong>
                    <br />
                    {this.state.editLogoFile ? (
                      <b>Logo berhasil diubah!</b>
                    ) : (
                      <input
                        type="file"
                        className="mb-3"
                        accept="image/*"
                        onChange={(e) =>
                          this.editLogoHandler(e, "editLogoFile")
                        }
                      />
                    )}
                  </div>
                </div>
              </Tab>
            </Tabs>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AdminBank);
