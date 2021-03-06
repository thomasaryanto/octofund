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
import ListCard from "../../components/Cards/ListCard";
import AdminSideBar from "../../components/SideBar/AdminSideBar";

const generalFormInit = {
  name: "",
  username: "",
  email: "",
  password: "",
  retypePassword: "",
  phone: "",
};

const managerFormInit = {
  logo: "",
  website: "",
  companyName: "",
};

class AdminManager extends React.Component {
  state = {
    userData: [],
    addDataShow: false,
    editDataShow: false,
    activeUser: {
      id: 0,
      name: "",
      username: "",
      email: "",
      password: "",
      retypePassword: "",
      phone: "",
      manager: {
        id: 0,
        logo: "",
        website: "",
        companyName: "",
      },
    },
    generalForm: {
      ...generalFormInit,
    },
    managerForm: {
      ...managerFormInit,
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
    this.getUserListData(this.state.activePage);
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

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getUserListData(this.state.activePage);
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

        Axios.post(`${API_URL}/users/upload/`, data)
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

        Axios.post(
          `${API_URL}/users/upload/manager/${this.state.activeUser.id}/`,
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

  getUserListData = (page) => {
    Axios.get(`${API_URL}/users/role/2?page=${page - 1}&size=4`)
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ userData: res.data.content });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getUserData = (id) => {
    Axios.get(`${API_URL}/users/${id}`)
      .then((res) => {
        this.setState({
          activeUser: {
            ...res.data,
            password: "",
            retypePassword: "",
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

  renderUsers = () => {
    return this.state.userData.map(({ manager, id, name }) => {
      return (
        <ListCard
          image={manager.logo}
          textTop={name}
          textMiddle={manager.companyName}
          textBottom={manager.website}
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
    this.getUserData(id);
    this.editDataToggle();
  };

  editProcessBtnHandler = () => {
    if (
      this.state.activeUser.password != "" ||
      this.state.activeUser.retypePassword != ""
    ) {
      if (
        this.state.activeUser.password != this.state.activeUser.retypePassword
      ) {
        return swal(
          "Terjadi kesalahan!",
          "Password dan konfirmasi password harus sama!",
          "error"
        );
      }
    }

    Axios.put(`${API_URL}/users`, this.state.activeUser)
      .then((res) => {
        swal("Berhasil!", "Manajer investasi berhasil disunting!", "success");
        this.editDataToggle();
        this.getUserListData(this.state.activePage);
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
      this.state.generalForm.password == this.state.generalForm.retypePassword
    ) {
      const userData = {
        user: {
          ...this.state.generalForm,
        },
        ...this.state.managerForm,
        logo: this.state.logoForm,
      };
      Axios.post(`${API_URL}/users/manager`, userData)
        .then((res) => {
          swal(
            "Registrasi berhasil!",
            "Manajer investasi berhasil ditambahkan!",
            "success"
          );
          this.addDataToggle();
          this.setState({
            generalForm: {
              ...generalFormInit,
            },
            managerForm: {
              ...managerFormInit,
            },
            logoForm: "",
            logoFile: "",
          });
          this.getUserListData(this.state.activePage);
        })
        .catch((err) => {
          const errorMessage = err.response
            ? err.response.data.errors.join("\n")
            : err.message;
          swal("Terjadi kesalahan!", errorMessage, "error");
        });
    } else {
      swal(
        "Terjadi kesalahan!",
        "Password dan konfirmasi password harus sama!",
        "error"
      );
    }
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
        Axios.delete(`${API_URL}/users/${id}`)
          .then((res) => {
            swal("Data berhasil dihapus!", {
              icon: "success",
            });
            this.getUserListData(this.state.activePage);
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
                          Manajemen Manajer Investasi{" "}
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
                        <div>
                          {this.state.totalItemsCount > 0 ? (
                            this.renderUsers()
                          ) : (
                            <h3>Belum ada data</h3>
                          )}
                        </div>
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
            <Modal.Title>Tambah Manajer Investasi</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <strong className="text-muted small">Nama Perusahaan</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.managerForm.companyName}
                  onChange={(e) =>
                    this.inputHandler(e, "companyName", "managerForm")
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <strong className="text-muted small">
                  Nama Penanggung Jawab
                </strong>
                <CustomText
                  className="mb-3"
                  value={this.state.generalForm.name}
                  onChange={(e) => this.inputHandler(e, "name", "generalForm")}
                />

                <strong className="text-muted small">Alamat Email</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.generalForm.email}
                  onChange={(e) => this.inputHandler(e, "email", "generalForm")}
                />

                <strong className="text-muted small">Username</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.generalForm.username}
                  onChange={(e) =>
                    this.inputHandler(e, "username", "generalForm")
                  }
                />

                <strong className="text-muted small">No Telepon</strong>
                <CustomText
                  className="mb-3"
                  type="number"
                  value={this.state.generalForm.phone}
                  onChange={(e) => this.inputHandler(e, "phone", "generalForm")}
                />
              </div>
              <div className="col-lg-6">
                <strong className="text-muted small">Kata Sandi</strong>
                <CustomText
                  className="mb-3"
                  type="password"
                  value={this.state.generalForm.password}
                  onChange={(e) =>
                    this.inputHandler(e, "password", "generalForm")
                  }
                />

                <strong className="text-muted small mt-3">
                  Konfirmasi Kata Sandi
                </strong>
                <CustomText
                  className="mb-3"
                  type="password"
                  value={this.state.generalForm.retypePassword}
                  onChange={(e) =>
                    this.inputHandler(e, "retypePassword", "generalForm")
                  }
                />

                <strong className="text-muted small">Website</strong>
                <CustomText
                  className="mb-3"
                  value={this.state.managerForm.website}
                  onChange={(e) =>
                    this.inputHandler(e, "website", "managerForm")
                  }
                />

                <strong className="text-muted small">Logo</strong>
                <br />
                {this.state.logoForm ? (
                  <b>Upload berhasil!</b>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    className="mb-3"
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
            <Modal.Title>Sunting Manajer Investasi</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey="data">
              <Tab eventKey="data" title="Data Manajer">
                <div className="row">
                  <div className="col-lg-12">
                    <strong className="text-muted small">
                      Nama Perusahaan
                    </strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeUser.manager.companyName}
                      onChange={(e) =>
                        this.inputNestedHandler(
                          e,
                          "companyName",
                          "manager",
                          "activeUser"
                        )
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <strong className="text-muted small">
                      Nama Penanggung Jawab
                    </strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeUser.name}
                      onChange={(e) =>
                        this.inputHandler(e, "name", "activeUser")
                      }
                    />

                    <strong className="text-muted small">Alamat Email</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeUser.email}
                      onChange={(e) =>
                        this.inputHandler(e, "email", "activeUser")
                      }
                    />

                    <strong className="text-muted small">Username</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeUser.username}
                      onChange={(e) =>
                        this.inputHandler(e, "username", "activeUser")
                      }
                    />

                    <strong className="text-muted small">No Telepon</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeUser.phone}
                      onChange={(e) =>
                        this.inputHandler(e, "phone", "activeUser")
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <strong className="text-muted small">
                      Kata Sandi Baru
                    </strong>
                    <CustomText
                      className="mb-3"
                      type="password"
                      placeholder="Kosongkan jika tidak ingin diganti"
                      value={this.state.activeUser.password}
                      onChange={(e) =>
                        this.inputHandler(e, "password", "activeUser")
                      }
                    />

                    <strong className="text-muted small mt-3">
                      Konfirmasi Kata Sandi Baru
                    </strong>
                    <CustomText
                      className="mb-3"
                      type="password"
                      placeholder="Kosongkan jika tidak ingin diganti"
                      value={this.state.activeUser.retypePassword}
                      onChange={(e) =>
                        this.inputHandler(e, "retypePassword", "activeUser")
                      }
                    />

                    <strong className="text-muted small">Website</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.activeUser.manager.website}
                      onChange={(e) =>
                        this.inputNestedHandler(
                          e,
                          "website",
                          "manager",
                          "activeUser"
                        )
                      }
                    />
                  </div>
                </div>
              </Tab>

              <Tab eventKey="logo" title="Logo Manajer">
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <strong className="text-muted small">
                      Ubah Logo Manajer
                    </strong>
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

export default AdminManager;
