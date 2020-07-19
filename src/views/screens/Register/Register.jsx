//libraries
import React from "react";
import { Accordion, Card } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import Axios from "axios";
import Select from "react-select";
import { API_URL } from "../../../constants/API";
import { Overlay } from "react-portal-overlay";
import { connect } from "react-redux";
import loading from "../../../assets/images/loading.gif";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Register extends React.Component {
  state = {
    generalForm: {
      name: "",
      username: "",
      email: "",
      password: "",
      retypePassword: "",
      phone: "",
    },
    detailForm: {
      identityNumber: "",
      sex: "",
      religion: "",
      job: "",
      maritalStatus: "",
      address: "",
      signature: "",
    },
    bankForm: {
      accountNumber: "",
      holderName: "",
      bank: null,
    },
    photoForm: {
      identityPhoto: "",
      selfiePhoto: "",
    },
    photoFile: {
      identityPhoto: "",
      selfiePhoto: "",
    },
    bankList: {},
    isSuccess: false,
    isOverlay: false,
    isDisabled: true,
  };

  sigPad = {};

  componentDidMount() {
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
  }

  signatureClear = () => {
    this.sigPad.clear();
  };

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  photoHandler = (e, field) => {
    this.setState(
      {
        photoFile: {
          ...this.state.photoFile,
          [field]: e.target.files[0],
        },
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.photoFile[field]);

        Axios.post(`${API_URL}/users/upload/`, data)
          .then((res) => {
            this.setState({
              photoForm: {
                ...this.state.photoForm,
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

  photoHandlerOCR = (e) => {
    this.setState(
      {
        photoFile: {
          ...this.state.photoFile,
          identityPhoto: e.target.files[0],
        },
        isOverlay: true,
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.photoFile.identityPhoto);

        Axios.post(`${API_URL}/users/upload/ktp`, data, { timeout: 300000 })
          .then((res) => {
            this.setState({
              photoForm: {
                ...this.state.photoForm,
                identityPhoto: res.data.fileName,
              },
              isOverlay: false,
              isDisabled: false,
            });

            if (res.data.detectionCount > 1) {
              this.setState({
                generalForm: {
                  ...this.state.generalForm,
                  name: res.data.name,
                },
                detailForm: {
                  ...this.state.detailForm,
                  identityNumber: res.data.nik,
                  address: res.data.address,
                },
              });

              if (res.data.sex != null) {
                this.setState({
                  detailForm: {
                    ...this.state.detailForm,
                    sex: res.data.sex,
                  },
                });
              }

              if (res.data.religion != null) {
                this.setState({
                  detailForm: {
                    ...this.state.detailForm,
                    religion: res.data.religion,
                  },
                });
              }

              if (res.data.job != null) {
                this.setState({
                  detailForm: {
                    ...this.state.detailForm,
                    job: res.data.job,
                  },
                });
              }

              if (res.data.marital != null) {
                this.setState({
                  detailForm: {
                    ...this.state.detailForm,
                    maritalStatus: res.data.marital,
                  },
                });
              }
              swal(
                "KTP berhasil terdeteksi!",
                "Mohon koreksi kembali data diri nasabah yang dimasukan secara otomatis.",
                "success"
              );
            } else {
              swal(
                "KTP gagal terdeteksi!",
                "Kamu tetap dapat memasukan data diri nasabah secara manual.",
                "warning"
              );
            }
          })
          .catch((err) => {
            this.setState({
              isOverlay: false,
              isDisabled: false,
            });
            const errorMessage = err.response
              ? err.response.data.errors.join("\n")
              : err.message;
            swal("Terjadi kesalahan!", errorMessage, "error");
          });
      }
    );
  };

  registerBtnHandler = () => {
    if (this.sigPad.isEmpty()) {
      return swal(
        "Terjadi kesalahan!",
        "Kamu belum melakukan tanda tangan!",
        "error"
      );
    }

    if (
      this.state.generalForm.password != this.state.generalForm.retypePassword
    ) {
      return swal(
        "Terjadi kesalahan!",
        "Password dan konfirmasi password harus sama!",
        "error"
      );
    }

    if (
      this.state.photoForm.identityPhoto == "" ||
      this.state.photoForm.selfiePhoto == ""
    ) {
      return swal(
        "Terjadi kesalahan!",
        "Foto KTP dan selfie harus diupload!",
        "error"
      );
    }

    this.setState(
      {
        detailForm: {
          ...this.state.detailForm,
          signature: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
        },
      },
      () => {
        const userData = {
          ...this.state.detailForm,
          ...this.state.photoForm,
          user: {
            ...this.state.generalForm,
            bankAccounts: [this.state.bankForm],
          },
        };
        Axios.post(`${API_URL}/users/member`, userData)
          .then((res) => {
            swal(
              "Registrasi berhasil!",
              "Silahkan verifikasi email kamu untuk melanjutkan.",
              "success"
            );
            this.setState({ isSuccess: true });
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

  bankListHandler = (e) => {
    this.setState({
      bankForm: {
        ...this.state.bankForm,
        bank: {
          id: e.id,
          name: e.name,
        },
      },
    });
  };

  changePhoto = (e, field) => {
    this.setState({
      photoForm: {
        ...this.state.photoForm,
        [field]: null,
      },
      isDisabled: true,
    });
  };

  render() {
    if (this.state.isSuccess) {
      return <Redirect to="/login" />;
    }
    if (this.props.user.id != 0) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="container-fluid image">
          <h1 className="text-center text-white pt-4">Pendaftaran Nasabah</h1>
          <div class="row justify-content-center pt-4 pb-5">
            <div class="col-lg-8 p-0">
              <div className="card">
                <div className="card-body">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        <strong>Informasi Akun </strong>
                        <p class="float-right">▼</p>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="row">
                            <div className="col-lg-6">
                              <strong className="text-muted small">
                                Username
                              </strong>
                              <CustomText
                                className="mb-3"
                                value={this.state.generalForm.username}
                                onChange={(e) =>
                                  this.inputHandler(
                                    e,
                                    "username",
                                    "generalForm"
                                  )
                                }
                              />

                              <strong className="text-muted small">
                                No Telepon
                              </strong>
                              <CustomText
                                className="mb-3"
                                type="number"
                                value={this.state.generalForm.phone}
                                onChange={(e) =>
                                  this.inputHandler(e, "phone", "generalForm")
                                }
                              />
                            </div>
                            <div className="col-lg-6">
                              <strong className="text-muted small">
                                Kata Sandi
                              </strong>
                              <CustomText
                                className="mb-3"
                                type="password"
                                value={this.state.generalForm.password}
                                onChange={(e) =>
                                  this.inputHandler(
                                    e,
                                    "password",
                                    "generalForm"
                                  )
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
                                  this.inputHandler(
                                    e,
                                    "retypePassword",
                                    "generalForm"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <strong className="text-muted small">
                                Alamat Email
                              </strong>
                              <CustomText
                                className="mb-3"
                                type="email"
                                value={this.state.generalForm.email}
                                onChange={(e) =>
                                  this.inputHandler(e, "email", "generalForm")
                                }
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        <strong>Data Diri Nasabah</strong>
                        <p class="float-right">▼</p>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          {this.state.photoForm.identityPhoto ? null : (
                            <div className="row">
                              <div className="col-lg-12">
                                <div
                                  class="alert alert-info text-center"
                                  role="alert"
                                >
                                  Silahkan upload KTP terlebih dahulu untuk
                                  pengisian data secara otomatis.
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="row">
                            <div className="col-lg-6">
                              <div>
                                <strong className="text-muted small">
                                  Upload Foto KTP
                                </strong>
                                <br />
                                {this.state.photoForm.identityPhoto ? (
                                  <>
                                    <b>
                                      Upload berhasil!{" "}
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          this.changePhoto(e, "identityPhoto");
                                        }}
                                      >
                                        Ganti
                                      </a>
                                    </b>
                                    <br />
                                    <br />
                                  </>
                                ) : (
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="mb-3"
                                    onChange={(e) => this.photoHandlerOCR(e)}
                                  />
                                )}
                              </div>

                              <div>
                                <strong className="text-muted small">
                                  Nomor KTP
                                </strong>
                                <CustomText
                                  className="mb-3"
                                  type="number"
                                  disabled={this.state.isDisabled}
                                  value={this.state.detailForm.identityNumber}
                                  onChange={(e) =>
                                    this.inputHandler(
                                      e,
                                      "identityNumber",
                                      "detailForm"
                                    )
                                  }
                                />
                              </div>

                              <div>
                                <strong className="text-muted small">
                                  Jenis Kelamin
                                </strong>
                                <CustomText
                                  className="mb-3"
                                  value={this.state.detailForm.sex}
                                  disabled={this.state.isDisabled}
                                  onChange={(e) =>
                                    this.inputHandler(e, "sex", "detailForm")
                                  }
                                />
                              </div>

                              <div>
                                <strong className="text-muted small">
                                  Pekerjaan
                                </strong>
                                <CustomText
                                  className="mb-3"
                                  value={this.state.detailForm.job}
                                  disabled={this.state.isDisabled}
                                  onChange={(e) =>
                                    this.inputHandler(e, "job", "detailForm")
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div>
                                <strong className="text-muted small">
                                  Upload Foto Selfie dengan KTP
                                </strong>
                                <br />
                                {this.state.photoForm.selfiePhoto ? (
                                  <>
                                    <b>
                                      Upload berhasil!{" "}
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          this.changePhoto(e, "selfiePhoto");
                                        }}
                                      >
                                        Ganti
                                      </a>
                                    </b>
                                    <br />
                                    <br />
                                  </>
                                ) : (
                                  <input
                                    type="file"
                                    className="mb-3"
                                    accept="image/*"
                                    onChange={(e) =>
                                      this.photoHandler(e, "selfiePhoto")
                                    }
                                  />
                                )}
                              </div>

                              <div>
                                <strong className="text-muted small">
                                  Nama Lengkap
                                </strong>
                                <CustomText
                                  className="mb-3"
                                  value={this.state.generalForm.name}
                                  disabled={this.state.isDisabled}
                                  onChange={(e) =>
                                    this.inputHandler(e, "name", "generalForm")
                                  }
                                />
                              </div>

                              <div>
                                <strong className="text-muted small">
                                  Agama
                                </strong>
                                <CustomText
                                  className="mb-3"
                                  value={this.state.detailForm.religion}
                                  disabled={this.state.isDisabled}
                                  onChange={(e) =>
                                    this.inputHandler(
                                      e,
                                      "religion",
                                      "detailForm"
                                    )
                                  }
                                />
                              </div>

                              <div>
                                <strong className="text-muted small">
                                  Status Pernikahan
                                </strong>
                                <CustomText
                                  className="mb-3"
                                  value={this.state.detailForm.maritalStatus}
                                  disabled={this.state.isDisabled}
                                  onChange={(e) =>
                                    this.inputHandler(
                                      e,
                                      "maritalStatus",
                                      "detailForm"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div>
                                <strong className="text-muted small">
                                  Alamat
                                </strong>
                                <CustomText
                                  className="mb-3"
                                  value={this.state.detailForm.address}
                                  disabled={this.state.isDisabled}
                                  onChange={(e) =>
                                    this.inputHandler(
                                      e,
                                      "address",
                                      "detailForm"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        <strong>Data Rekening Bank </strong>
                        <p class="float-right">▼</p>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="row">
                            <div className="col-lg-6">
                              <strong className="text-muted small">
                                No Rekening
                              </strong>
                              <CustomText
                                className="mb-3"
                                type="number"
                                value={this.state.bankForm.accountNumber}
                                onChange={(e) =>
                                  this.inputHandler(
                                    e,
                                    "accountNumber",
                                    "bankForm"
                                  )
                                }
                              />
                            </div>
                            <div className="col-lg-6">
                              <strong className="text-muted small">
                                Nama Pemegang
                              </strong>
                              <CustomText
                                className="mb-3"
                                value={this.state.generalForm.holderName}
                                onChange={(e) =>
                                  this.inputHandler(e, "holderName", "bankForm")
                                }
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <strong className="text-muted small">
                                Pilih Bank
                              </strong>
                              <Select
                                menuPortalTarget={document.querySelector(
                                  "body"
                                )}
                                value={this.state.bankForm.bank}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.name}
                                onChange={this.bankListHandler}
                                options={this.state.bankList}
                                placeholder="Pilih Bank..."
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="3">
                        <strong>Syarat & Ketentuan</strong>
                        <p class="float-right">▼</p>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <div className="row">
                            <div className="col-lg-6">
                              <div>
                                <p>
                                  Dengan menandatangani kotak berikut, saya
                                  setuju dengan :
                                </p>
                                <br />
                                <ul>
                                  <li>
                                    Syarat dan Ketentuan Transaksi Online di PT
                                    Octofund Pasar Investasi
                                  </li>
                                  <li>
                                    Pernyataan Nasabah Pembukaan Rekening Reksa
                                    Dana di PT Octofund Pasar Investasi
                                  </li>
                                  <li>
                                    Pernyataan Penggunaan Tanda Tangan Elektonik
                                    di PT Octofund Pasar Investasi
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div>
                                <div className="text-center">
                                  <SignatureCanvas
                                    penColor="black"
                                    canvasProps={{
                                      width: 320,
                                      height: 180,
                                      className: "border rounded",
                                    }}
                                    ref={(ref) => {
                                      this.sigPad = ref;
                                    }}
                                  />
                                  <br />
                                  <CustomButton
                                    type="textual"
                                    className="small"
                                    onClick={this.signatureClear}
                                  >
                                    Ulangi Tanda Tangan
                                  </CustomButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  <hr />
                  <div className="text-center">
                    <CustomButton
                      type="contained"
                      className="bg-primary borderless"
                      onClick={this.registerBtnHandler}
                    >
                      Daftar Sekarang
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Overlay
          open={this.state.isOverlay}
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            display: "inline-block",
          }}
        >
          <div class="row h-100">
            <div class="col-sm-12 my-auto text-center">
              <img
                src={loading}
                height="100"
                width="100"
                className="rounded-circle"
              />
              <h3 style={{ color: "white" }}>Mendeteksi KTP...</h3>
            </div>
          </div>
        </Overlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Register);
