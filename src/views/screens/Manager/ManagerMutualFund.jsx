//libraries
import React from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import Select from "react-select";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import UserCard from "../../components/Cards/UserCard";

const mutualFundFormInit = {
  name: "",
  launchDate: "",
  minimumBuy: 0,
  totalFund: "",
  custodyBank: "",
  lastPrice: 0.0,
  mutualFundCategory: null,
  mutualFundType: null,
};

const documentInit = {
  factsheetFile: "",
  prospectusFile: "",
};

class ManagerMutualFund extends React.Component {
  state = {
    mutualFundData: [],
    addDataShow: false,
    editDataShow: false,
    activeMutualFund: {
      id: 0,
      name: "",
      launchDate: "",
      minimumBuy: 0,
      totalFund: "",
      custodyBank: "",
      lastPrice: 0.0,
      prospectusFile: "",
      factsheetFile: "",
      mutualFundCategory: null,
      mutualFundType: null,
      manager: {
        id: 0,
        logo: "",
        website: "",
        companyName: "",
      },
    },
    mutualFundForm: {
      ...mutualFundFormInit,
    },
    documentForm: {
      ...documentInit,
    },
    documentFile: {
      ...documentInit,
    },
    editDocumentForm: {
      ...documentInit,
    },
    categoryList: {},
    typeList: {},
    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentDidMount() {
    this.getMutualFundCategory();
    this.getMutualFundType();
    this.getMutualFundListData(this.state.activePage);
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

  inputNestedHandler = (e, field, childForm, parentForm) => {
    const { value } = e.target;
    this.setState({
      [parentForm]: {
        ...this.state[parentForm],
        [childForm]: {
          ...this.state[parentForm][childForm],
          [field]: value,
        },
      },
    });
  };

  documentHandler = (e, field) => {
    this.setState(
      {
        documentFile: {
          ...this.state.documentFile,
          [field]: e.target.files[0],
        },
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.documentFile[field]);

        Axios.post(`${API_URL}/mutualfund/upload/`, data)
          .then((res) => {
            this.setState({
              documentForm: {
                ...this.state.documentForm,
                [field]: res.data.fileName,
              },
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

  editDocumentHandler = (e, field) => {
    this.setState(
      {
        editDocumentForm: {
          ...this.state.editDocumentForm,
          [field]: e.target.files[0],
        },
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.editDocumentForm[field]);

        Axios.post(
          `${API_URL}/mutualfund/upload/${this.state.activeMutualFund.id}/${field}`,
          data
        )
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

  selectChangeHandler = (e, field, form) => {
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: {
          id: e.id,
          name: e.name,
        },
      },
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getMutualFundListData(this.state.activePage);
    });
  };

  getMutualFundListData = (page) => {
    Axios.get(`${API_URL}/mutualfund/manager/2?page=${page - 1}&size=2`)
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ mutualFundData: res.data.content });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getMutualFundData = (id) => {
    Axios.get(`${API_URL}/mutualfund/${id}`)
      .then((res) => {
        this.setState({
          editDocumentForm: {
            ...documentInit,
          },
        });
        this.setState({
          activeMutualFund: {
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

  getMutualFundCategory = () => {
    Axios.get(`${API_URL}/mutualfund/category`)
      .then((res) => {
        this.setState({
          categoryList: res.data.map(({ id, name }) => ({
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

  getMutualFundType = () => {
    Axios.get(`${API_URL}/mutualfund/type`)
      .then((res) => {
        this.setState({
          typeList: res.data.map(({ id, name }) => ({
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

  renderMutualFunds = () => {
    return this.state.mutualFundData.map(
      ({ manager, id, name, custodyBank }) => {
        return (
          <UserCard
            image={manager.logo}
            textTop={manager.companyName}
            textMiddle={name}
            textBottom={custodyBank}
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
    this.getMutualFundData(id);
    this.editDataToggle();
  };

  editProcessBtnHandler = () => {
    Axios.put(`${API_URL}/mutualfund`, this.state.activeMutualFund)
      .then((res) => {
        swal("Berhasil!", "Reksadana berhasil disunting!", "success");
        this.editDataToggle();
        this.getMutualFundListData();
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
    if (
      this.state.documentForm.factsheetFile == "" ||
      this.state.documentForm.prospectusFile == ""
    ) {
      return swal(
        "Terjadi kesalahan!",
        "Dokumen prospectus dan fund fact sheet harus diupload!",
        "error"
      );
    }

    const mutualFundData = {
      ...this.state.mutualFundForm,
      ...this.state.documentForm,
      manager: {
        id: 2,
      },
    };

    Axios.post(`${API_URL}/mutualfund`, mutualFundData)
      .then((res) => {
        swal("Berhasil!", "Reksadana berhasil ditambahkan!", "success");
        this.addDataToggle();
        this.setState({
          mutualFundForm: {
            ...mutualFundFormInit,
          },
          documentForm: {
            ...documentInit,
          },
          documentFile: {
            ...documentInit,
          },
        });
        this.getMutualFundListData();
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
      text: "Kamu yakin akan menghapus reksadana ini?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Axios.delete(`${API_URL}/mutualfund/${id}`)
          .then((res) => {
            swal("Reksadana berhasil dihapus!", {
              icon: "success",
            });
            this.getMutualFundListData();
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
                          Manajemen Reksadana{" "}
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
                        <div>{this.renderMutualFunds()}</div>
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
                          onChange={this.handlePageChange.bind(this)}
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
            <Modal.Title>Tambah Produk Reksadana</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-lg-6">
                <strong className="text-muted small">Nama Reksadana</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundForm.name}
                  onChange={(e) =>
                    this.inputHandler(e, "name", "mutualFundForm")
                  }
                />

                <strong className="text-muted small">Jenis Reksadana</strong>
                <Select
                  value={this.state.mutualFundForm.mutualFundType}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "mutualFundType",
                      "mutualFundForm"
                    );
                  }}
                  options={this.state.typeList}
                  placeholder="Pilih Jenis Reksadana..."
                  className="mb-3"
                />

                <strong className="text-muted small">
                  Nama Bank Kustodian
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundForm.custodyBank}
                  onChange={(e) =>
                    this.inputHandler(e, "custodyBank", "mutualFundForm")
                  }
                />

                <strong className="text-muted small">
                  Tanggal Diluncurkan
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundForm.launchDate}
                  onChange={(e) =>
                    this.inputHandler(e, "launchDate", "mutualFundForm")
                  }
                />

                <strong className="text-muted small">Dokumen Prospectus</strong>
                <br />
                {this.state.documentForm.prospectusFile ? (
                  <b>Upload berhasil!</b>
                ) : (
                  <input
                    type="file"
                    className="mb-3"
                    onChange={(e) => this.documentHandler(e, "prospectusFile")}
                  />
                )}
              </div>
              <div className="col-lg-6">
                <strong className="text-muted small">Harga Unit</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundForm.lastPrice}
                  onChange={(e) =>
                    this.inputHandler(e, "lastPrice", "mutualFundForm")
                  }
                />

                <strong className="text-muted small">Kategori Reksadana</strong>
                <Select
                  value={this.state.mutualFundForm.mutualFundCategory}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "mutualFundCategory",
                      "mutualFundForm"
                    );
                  }}
                  options={this.state.categoryList}
                  placeholder="Pilih Kategori Reksadana..."
                  className="mb-3"
                />

                <strong className="text-muted small">
                  Total Dana Kelolaan
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundForm.totalFund}
                  onChange={(e) =>
                    this.inputHandler(e, "totalFund", "mutualFundForm")
                  }
                />

                <strong className="text-muted small">Minimal Pembelian</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundForm.minimumBuy}
                  onChange={(e) =>
                    this.inputHandler(e, "minimumBuy", "mutualFundForm")
                  }
                />

                <strong className="text-muted small">
                  Dokumen Fund Fact Sheet
                </strong>
                <br />
                {this.state.documentForm.factsheetFile ? (
                  <b>Upload berhasil!</b>
                ) : (
                  <input
                    type="file"
                    className="mb-3"
                    onChange={(e) => this.documentHandler(e, "factsheetFile")}
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
            <Modal.Title>Ubah Reksadana</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey="data">
              <Tab eventKey="data" title="Data Reksadana">
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <strong className="text-muted small">Nama Reksadana</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeMutualFund.name}
                      onChange={(e) =>
                        this.inputHandler(e, "name", "activeMutualFund")
                      }
                    />

                    <strong className="text-muted small">
                      Jenis Reksadana
                    </strong>
                    <Select
                      value={this.state.activeMutualFund.mutualFundType}
                      getOptionValue={(option) => option.id}
                      getOptionLabel={(option) => option.name}
                      onChange={(e) => {
                        this.selectChangeHandler(
                          e,
                          "mutualFundType",
                          "activeMutualFund"
                        );
                      }}
                      options={this.state.typeList}
                      className="mb-3"
                    />

                    <strong className="text-muted small">
                      Nama Bank Kustodian
                    </strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeMutualFund.custodyBank}
                      onChange={(e) =>
                        this.inputHandler(e, "custodyBank", "activeMutualFund")
                      }
                    />

                    <strong className="text-muted small">
                      Tanggal Diluncurkan
                    </strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeMutualFund.launchDate}
                      onChange={(e) =>
                        this.inputHandler(e, "launchDate", "activeMutualFund")
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <strong className="text-muted small">Harga Unit</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeMutualFund.lastPrice}
                      onChange={(e) =>
                        this.inputHandler(e, "lastPrice", "activeMutualFund")
                      }
                    />

                    <strong className="text-muted small">
                      Kategori Reksadana
                    </strong>
                    <Select
                      value={this.state.activeMutualFund.mutualFundCategory}
                      getOptionValue={(option) => option.id}
                      getOptionLabel={(option) => option.name}
                      onChange={(e) => {
                        this.selectChangeHandler(
                          e,
                          "mutualFundCategory",
                          "activeMutualFund"
                        );
                      }}
                      options={this.state.categoryList}
                      className="mb-3"
                    />

                    <strong className="text-muted small">
                      Total Dana Kelolaan
                    </strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeMutualFund.totalFund}
                      onChange={(e) =>
                        this.inputHandler(e, "totalFund", "activeMutualFund")
                      }
                    />

                    <strong className="text-muted small">
                      Minimal Pembelian
                    </strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeMutualFund.minimumBuy}
                      onChange={(e) =>
                        this.inputHandler(e, "minimumBuy", "activeMutualFund")
                      }
                    />
                  </div>
                </div>
              </Tab>

              <Tab eventKey="document" title="Dokumen Reksadana">
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <strong className="text-muted small">
                      Ubah Fund Fact Sheet
                    </strong>
                    <br />
                    {this.state.editDocumentForm.factsheetFile ? (
                      <b>Dokumen berhasil diubah!</b>
                    ) : (
                      <input
                        type="file"
                        className="mb-3"
                        onChange={(e) =>
                          this.editDocumentHandler(e, "factsheetFile")
                        }
                      />
                    )}
                  </div>

                  <div className="col-lg-6">
                    <strong className="text-muted small">
                      Ubah Prospectus
                    </strong>
                    <br />
                    {this.state.editDocumentForm.prospectusFile ? (
                      <b>Dokumen berhasil diubah!</b>
                    ) : (
                      <input
                        type="file"
                        className="mb-3"
                        onChange={(e) =>
                          this.editDocumentHandler(e, "prospectusFile")
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

export default ManagerMutualFund;
