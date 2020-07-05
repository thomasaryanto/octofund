//libraries
import React from "react";
import { Nav, Accordion, Card } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Register extends React.Component {
  state = {
    generalForm: {
      name: "testing",
      username: "",
      email: "",
      password: "",
      retypePassword: "",
      phone: "",
    },
    detailForm: {
      identityNumber: Math.floor(Math.random() * 100000),
      birthDate: "testing",
      birthPlace: "testing",
      sex: "testing",
      religion: "testing",
      job: "testing",
      maritalStatus: "testing",
      address: "testing",
      signature: "testing",
    },
    photoForm: {
      identityPhoto: "",
      selfiePhoto: "",
    },
    photoFile: {
      identityPhoto: "",
      selfiePhoto: "",
    },
    isSuccess: false,
  };

  sigPad = {};

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

        Axios.post(`${API_URL}/users/upload/${field}`, data)
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

  registerBtnHandler = () => {
    if (!this.sigPad.isEmpty()) {
      this.setState(
        {
          detailForm: {
            ...this.state.detailForm,
            // signature: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
            signature: "ok",
          },
        },
        () => {
          if (
            this.state.generalForm.password ==
            this.state.generalForm.retypePassword
          ) {
            const userData = {
              ...this.state.detailForm,
              ...this.state.photoForm,
              user: {
                ...this.state.generalForm,
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
          } else {
            swal(
              "Terjadi kesalahan!",
              "Password dan konfirmasi password harus sama!",
              "error"
            );
          }
        }
      );
    } else {
      swal("Terjadi kesalahan!", "Kamu belum melakukan tanda tangan!", "error");
    }
  };

  testButton = () => {
    console.log(this.state);
  };

  render() {
    if (this.state.isSuccess) {
      return <Redirect to="/login" />;
    }
    return (
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
                                this.inputHandler(e, "username", "generalForm")
                              }
                            />

                            <strong className="text-muted small">
                              No Telepon
                            </strong>
                            <CustomText
                              className="mb-3"
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
                        <div className="row">
                          <div className="col-lg-6">
                            <div>
                              <strong className="text-muted small">
                                Upload Foto KTP
                              </strong>
                              <br />
                              {this.state.photoForm.identityPhoto ? (
                                <b>Upload berhasil!</b>
                              ) : (
                                <input
                                  type="file"
                                  className="mb-3"
                                  onChange={(e) =>
                                    this.photoHandler(e, "identityPhoto")
                                  }
                                />
                              )}
                            </div>

                            <div>
                              <strong className="text-muted small">
                                Nomor KTP
                              </strong>
                              <CustomText
                                className="mb-3"
                                value={Math.floor(Math.random() * 100000)}
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
                                Tempat Lahir
                              </strong>
                              <CustomText
                                className="mb-3"
                                value="testing"
                                onChange={(e) =>
                                  this.inputHandler(
                                    e,
                                    "birthPlace",
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
                                value="testing"
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
                                value="testing"
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
                                <b>Upload berhasil!</b>
                              ) : (
                                <input
                                  type="file"
                                  className="mb-3"
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
                                value="testing"
                                onChange={(e) =>
                                  this.inputHandler(e, "name", "generalForm")
                                }
                              />
                            </div>

                            <div>
                              <strong className="text-muted small">
                                Tanggal Lahir
                              </strong>
                              <CustomText
                                className="mb-3"
                                value="testing"
                                onChange={(e) =>
                                  this.inputHandler(
                                    e,
                                    "birthDate",
                                    "detailForm"
                                  )
                                }
                              />
                            </div>

                            <div>
                              <strong className="text-muted small">
                                Agama
                              </strong>
                              <CustomText
                                className="mb-3"
                                value="testing"
                                onChange={(e) =>
                                  this.inputHandler(e, "religion", "detailForm")
                                }
                              />
                            </div>

                            <div>
                              <strong className="text-muted small">
                                Status Pernikahan
                              </strong>
                              <CustomText
                                className="mb-3"
                                value="testing"
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
                                value="testing"
                                onChange={(e) =>
                                  this.inputHandler(e, "address", "detailForm")
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
                      <strong>Syarat & Ketentuan</strong>
                      <p class="float-right">▼</p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <div className="row">
                          <div className="col-lg-6">
                            <div>
                              <p>
                                Dengan menandatangani kotak berikut, saya setuju
                                dengan :
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
    );
  }
}

export default Register;
