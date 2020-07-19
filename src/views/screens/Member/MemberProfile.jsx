//libraries
import React from "react";
import { Tabs, Tab, Modal } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import MemberSideBar from "../../components/SideBar/MemberSideBar";
import { connect } from "react-redux";

class MemberProfile extends React.Component {
  state = {
    userData: {
      password: "",
      retypePassword: "",
      oldPassword: "",
      member: {},
    },
    editShow: false,
  };

  componentDidMount() {
    this.getUserData();
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

  editToggle = () => {
    this.setState({ editShow: !this.state.editShow });
  };

  getUserData = () => {
    Axios.get(`${API_URL}/users/${this.props.user.id}`)
      .then((res) => {
        this.setState({
          userData: {
            ...res.data,
            password: "",
            retypePassword: "",
            oldPassword: "",
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

  editBtnHandler = () => {
    if (
      this.state.userData.password != "" ||
      this.state.userData.retypePassword != ""
    ) {
      if (this.state.userData.password != this.state.userData.retypePassword) {
        return swal(
          "Terjadi kesalahan!",
          "Password dan konfirmasi password harus sama!",
          "error"
        );
      }
      if (this.state.userData.oldPassword == "") {
        return swal(
          "Terjadi kesalahan!",
          "Password lama harus diisi!",
          "error"
        );
      }
    }
    console.log(this.state.userData);

    Axios.put(`${API_URL}/users/edit`, this.state.userData, {
      params: {
        oldPassword: this.state.userData.oldPassword,
      },
    })
      .then((res) => {
        swal("Berhasil!", "Profil berhasil disunting!", "success");
        this.editToggle();
        this.getUserData();
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  forgotPasswordBtnHandler = () => {
    const userData = {
      email: this.state.userData.email,
    };
    Axios.post(`${API_URL}/users/forgot`, userData)
      .then((res) => {
        swal("Berhasil!", res.data, "success");
      })
      .catch((err) => {
        console.log(err);
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
              <MemberSideBar />

              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body">
                    {this.props.user.rejected ? (
                      <div className="row">
                        <div className="col-lg-12">
                          <div
                            class="alert alert-danger text-center"
                            role="alert"
                          >
                            Verifikasi data diri ditolak. Harap membenahi
                            kesalahan data yang sudah kami kirim melalui email.
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="card">
                      <div class="card-header">
                        <p>Data Diri Nasabah</p>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-lg-9">
                                <p>
                                  Kamu dapat mengubah detail data diri di sini,
                                  beberapa data mungkin membutuhkan verifikasi
                                  dari sistem kami.
                                </p>
                              </div>
                              <div className="col-lg-3">
                                <div className="float-right">
                                  <CustomButton
                                    type="contained"
                                    className="small bg-primary borderless ml-2"
                                    onClick={this.editToggle}
                                  >
                                    Ubah Profil
                                  </CustomButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-lg-4">
                            <strong className="text-muted small">
                              Nama sesuai identitas
                            </strong>
                            <p className="pb-3">{this.state.userData.name}</p>

                            <strong className="text-muted small">Email</strong>
                            <p className="pb-3">{this.state.userData.email}</p>

                            <strong className="text-muted small">
                              Jenis Kelamin
                            </strong>
                            <p className="pb-3">
                              {this.state.userData.member.sex}
                            </p>
                          </div>
                          <div className="col-lg-4">
                            <strong className="text-muted small">
                              No. KTP
                            </strong>
                            <p className="pb-3">
                              {this.state.userData.member.identityNumber}
                            </p>

                            <strong className="text-muted small">
                              No. Ponsel
                            </strong>
                            <p className="pb-3">{this.state.userData.phone}</p>

                            <strong className="text-muted small">Alamat</strong>
                            <p className="pb-3">
                              {this.state.userData.member.address}
                            </p>
                          </div>
                          <div className="col-lg-4">
                            <strong className="text-muted small">
                              Pekerjaan
                            </strong>
                            <p className="pb-3">
                              {this.state.userData.member.job}
                            </p>

                            <strong className="text-muted small">
                              Status Pernikahan
                            </strong>
                            <p className="pb-3">
                              {this.state.userData.member.maritalStatus}
                            </p>

                            <strong className="text-muted small">Agama</strong>
                            <p className="pb-3">
                              {this.state.userData.member.religion}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal size="lg" show={this.state.editShow} onHide={this.editToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Profil</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey="data">
              <Tab eventKey="data" title="Ubah Data Pribadi">
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <strong className="text-muted small">Nama</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.name}
                      onChange={(e) => this.inputHandler(e, "name", "userData")}
                    />

                    <strong className="text-muted small">Alamat Email</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.email}
                      onChange={(e) =>
                        this.inputHandler(e, "email", "userData")
                      }
                    />

                    <strong className="text-muted small">Username</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.username}
                      onChange={(e) =>
                        this.inputHandler(e, "username", "userData")
                      }
                    />

                    <strong className="text-muted small">No Telepon</strong>
                    <CustomText
                      className="mb-3"
                      type="number"
                      value={this.state.userData.phone}
                      onChange={(e) =>
                        this.inputHandler(e, "phone", "userData")
                      }
                    />

                    <strong className="text-muted small">Agama</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.member.religion}
                      onChange={(e) =>
                        this.inputNestedHandler(
                          e,
                          "religion",
                          "member",
                          "userData"
                        )
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <strong className="text-muted small">Jenis Kelamin</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.member.sex}
                      onChange={(e) =>
                        this.inputNestedHandler(e, "sex", "member", "userData")
                      }
                    />

                    <strong className="text-muted small">Pekerjaan</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.member.job}
                      onChange={(e) =>
                        this.inputNestedHandler(e, "job", "member", "userData")
                      }
                    />

                    <strong className="text-muted small">
                      Status Pernikahan
                    </strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.member.maritalStatus}
                      onChange={(e) =>
                        this.inputNestedHandler(
                          e,
                          "maritalStatus",
                          "member",
                          "userData"
                        )
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <strong className="text-muted small">Alamat</strong>
                    <CustomText
                      className="mb-3"
                      value={this.state.userData.member.address}
                      onChange={(e) =>
                        this.inputNestedHandler(
                          e,
                          "address",
                          "member",
                          "userData"
                        )
                      }
                    />
                  </div>
                </div>
              </Tab>
              <Tab eventKey="password" title="Ubah Password">
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <strong className="text-muted small">
                      Kata Sandi Lama (
                      <a href="#forgot" onClick={this.forgotPasswordBtnHandler}>
                        Lupa Password?
                      </a>
                      )
                    </strong>
                    <CustomText
                      className="mb-3"
                      type="password"
                      placeholder="Kosongkan jika tidak ingin diganti"
                      value={this.state.userData.oldPassword}
                      onChange={(e) =>
                        this.inputHandler(e, "oldPassword", "userData")
                      }
                    />

                    <strong className="text-muted small">
                      Kata Sandi Baru
                    </strong>
                    <CustomText
                      className="mb-3"
                      type="password"
                      placeholder="Kosongkan jika tidak ingin diganti"
                      value={this.state.userData.password}
                      onChange={(e) =>
                        this.inputHandler(e, "password", "userData")
                      }
                    />

                    <strong className="text-muted small mt-3">
                      Konfirmasi Kata Sandi Baru
                    </strong>
                    <CustomText
                      className="mb-3"
                      type="password"
                      placeholder="Kosongkan jika tidak ingin diganti"
                      value={this.state.userData.retypePassword}
                      onChange={(e) =>
                        this.inputHandler(e, "retypePassword", "userData")
                      }
                    />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={this.editToggle}
            >
              Tutup
            </CustomButton>
            <CustomButton
              type="contained"
              className="text-center bg-primary borderless ml-2"
              onClick={this.editBtnHandler}
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

export default connect(mapStateToProps)(MemberProfile);
