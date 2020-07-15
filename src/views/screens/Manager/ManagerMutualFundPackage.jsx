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

const mutualFundPackageFormInit = {
  packageName: "",
  description: "",
  percentageOne: 0,
  percentageTwo: 0,
  percentageThree: 0,
  productOne: null,
  productTwo: null,
  productThree: null,
};

class ManagerMutualFundPackage extends React.Component {
  state = {
    mutualFundPackageData: [],
    addDataShow: false,
    editDataShow: false,
    activeMutualFundPackage: {
      id: 0,
      packageName: "",
      description: "",
      date: null,
      percentageOne: 0,
      percentageTwo: 0,
      percentageThree: 0,
      productOne: null,
      productTwo: null,
      productThree: null,
    },
    mutualFundPackageForm: {
      ...mutualFundPackageFormInit,
    },
    productList: {},

    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentDidMount() {
    this.getProducts();
    this.getMutualFundPackageListData(this.state.activePage);
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

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getMutualFundPackageListData(this.state.activePage);
    });
  };

  getMutualFundPackageListData = (page) => {
    Axios.get(`${API_URL}/packages/manager/2?page=${page - 1}&size=2`)
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ mutualFundPackageData: res.data.content });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getMutualFundPackageData = (id) => {
    Axios.get(`${API_URL}/packages/${id}`)
      .then((res) => {
        this.setState({
          activeMutualFundPackage: {
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

  getProducts = () => {
    Axios.get(`${API_URL}/mutualfund/manager/2/all`)
      .then((res) => {
        this.setState({
          productList: res.data.map(({ id, name }) => ({
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

  renderMutualFundPackages = () => {
    return this.state.mutualFundPackageData.map(({ id, packageName }) => {
      return (
        <UserCard
          image="testing"
          textTop="testing"
          textMiddle={packageName}
          textBottom="testing"
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
    this.setState({ editDataShow: !this.state.editDataShow });
  };

  editBtnHandler = (id) => {
    this.getMutualFundPackageData(id);
    this.editDataToggle();
  };

  editProcessBtnHandler = () => {
    const packageData = {
      ...this.state.activeMutualFundPackage,
      manager: {
        id: 2,
      },
    };
    Axios.put(`${API_URL}/packages`, packageData)
      .then((res) => {
        swal("Berhasil!", "Pakert reksadana berhasil disunting!", "success");
        this.editDataToggle();
        this.getMutualFundPackageListData();
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
    const mutualFundPackageData = {
      ...this.state.mutualFundPackageForm,
      manager: {
        id: 2,
      },
    };

    Axios.post(`${API_URL}/packages`, mutualFundPackageData)
      .then((res) => {
        swal("Berhasil!", "Paket reksadana berhasil ditambahkan!", "success");
        this.addDataToggle();
        this.setState({
          mutualFundPackageForm: {
            ...mutualFundPackageFormInit,
          },
        });
        this.getMutualFundPackageListData();
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
        Axios.delete(`${API_URL}/packages/${id}`)
          .then((res) => {
            swal("Paket reksadana berhasil dihapus!", {
              icon: "success",
            });
            this.getMutualFundPackageListData();
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
                          Manajemen Paket Reksadana{" "}
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
                        <div>{this.renderMutualFundPackages()}</div>
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
            <Modal.Title>Tambah Paket Reksadana</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <strong className="text-muted small">Nama Paket</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundPackageForm.packageName}
                  onChange={(e) =>
                    this.inputHandler(e, "packageName", "mutualFundPackageForm")
                  }
                />

                <strong className="text-muted small">Deskripsi Paket</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundPackageForm.description}
                  onChange={(e) =>
                    this.inputHandler(e, "description", "mutualFundPackageForm")
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <strong className="text-muted small">Reksadana 1</strong>
                <Select
                  value={this.state.mutualFundPackageForm.productOne}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "productOne",
                      "mutualFundPackageForm"
                    );
                  }}
                  options={this.state.productList}
                  placeholder="Pilih Reksadana..."
                />
                <br />
                <strong className="text-muted small">Reksadana 2</strong>
                <Select
                  value={this.state.mutualFundPackageForm.productTwo}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "productTwo",
                      "mutualFundPackageForm"
                    );
                  }}
                  options={this.state.productList}
                  placeholder="Pilih Reksadana..."
                />
                <br />
                <strong className="text-muted small">Reksadana 3</strong>
                <Select
                  value={this.state.mutualFundPackageForm.productThree}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "productThree",
                      "mutualFundPackageForm"
                    );
                  }}
                  options={this.state.productList}
                  placeholder="Pilih Reksadana..."
                />
              </div>
              <div className="col-lg-6">
                <strong className="text-muted small">
                  Persentase Reksadana 1
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundPackageForm.percentageOne}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "percentageOne",
                      "mutualFundPackageForm"
                    )
                  }
                />

                <strong className="text-muted small">
                  Persentase Reksadana 2
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundPackageForm.percentageTwo}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "percentageTwo",
                      "mutualFundPackageForm"
                    )
                  }
                />

                <strong className="text-muted small">
                  Persentase Reksadana 3
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.mutualFundPackageForm.percentageThree}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "percentageThree",
                      "mutualFundPackageForm"
                    )
                  }
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
            <Modal.Title>Ubah Paket Reksadana</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <strong className="text-muted small">Nama Paket</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.activeMutualFundPackage.packageName}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "packageName",
                      "activeMutualFundPackage"
                    )
                  }
                />

                <strong className="text-muted small">Deskripsi Paket</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.activeMutualFundPackage.description}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "description",
                      "activeMutualFundPackage"
                    )
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <strong className="text-muted small">Reksadana 1</strong>
                <Select
                  value={this.state.activeMutualFundPackage.productOne}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "productOne",
                      "activeMutualFundPackage"
                    );
                  }}
                  options={this.state.productList}
                  placeholder="Pilih Reksadana..."
                />
                <br />
                <strong className="text-muted small">Reksadana 2</strong>
                <Select
                  value={this.state.activeMutualFundPackage.productTwo}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "productTwo",
                      "activeMutualFundPackage"
                    );
                  }}
                  options={this.state.productList}
                  placeholder="Pilih Reksadana..."
                />
                <br />
                <strong className="text-muted small">Reksadana 3</strong>
                <Select
                  value={this.state.activeMutualFundPackage.productThree}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e) => {
                    this.selectChangeHandler(
                      e,
                      "productThree",
                      "activeMutualFundPackage"
                    );
                  }}
                  options={this.state.productList}
                  placeholder="Pilih Reksadana..."
                />
              </div>
              <div className="col-lg-6">
                <strong className="text-muted small">
                  Persentase Reksadana 1
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.activeMutualFundPackage.percentageOne}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "percentageOne",
                      "activeMutualFundPackage"
                    )
                  }
                />

                <strong className="text-muted small">
                  Persentase Reksadana 2
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.activeMutualFundPackage.percentageTwo}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "percentageTwo",
                      "activeMutualFundPackage"
                    )
                  }
                />

                <strong className="text-muted small">
                  Persentase Reksadana 3
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.activeMutualFundPackage.percentageThree}
                  onChange={(e) =>
                    this.inputHandler(
                      e,
                      "percentageThree",
                      "activeMutualFundPackage"
                    )
                  }
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

export default ManagerMutualFundPackage;
