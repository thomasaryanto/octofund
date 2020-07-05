//libraries
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

// actions
import { loginHandler } from "../../../redux/actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    forgotPassword: "",
    forgotPasswordShow: false,
  };

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  loginBtnHandler = () => {
    const { email, password } = this.state;
    let userData = {
      email,
      password,
    };

    this.props.onLogin(userData);
  };

  resendVerificationBtnHandler = (email) => {
    const userData = {
      email: email,
    };
    Axios.post(`${API_URL}/users/verify/resend/`, userData)
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

  forgotPasswordBtnHandler = () => {
    const userData = {
      email: this.state.forgotPassword,
    };
    Axios.post(`${API_URL}/users/forgot`, userData)
      .then((res) => {
        swal("Berhasil!", res.data, "success");
        this.setState({
          forgotPasswordShow: false,
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

  forgotPasswordToggle = () => {
    this.setState({ forgotPasswordShow: !this.state.forgotPasswordShow });
  };

  render() {
    if (this.props.user.id != 0) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="container-fluid" style={{ height: "100%" }}>
          <div class="row justify-content-center pt-5">
            <div class="col-lg-5">
              <div class="card">
                <div class="card-header">Masuk</div>
                <div class="card-body">
                  {this.props.user.msg ? (
                    <div className="alert alert-danger mt-3">
                      <p className="text-center">
                        {this.props.user.msg}{" "}
                        {this.props.user.msg.includes("verifikasi") ? (
                          <>
                            <br />
                            <a
                              href="#"
                              onClick={() => {
                                this.resendVerificationBtnHandler(
                                  this.state.email
                                );
                              }}
                              className="alert-link"
                            >
                              Kirim Ulang Aktivasi
                            </a>
                          </>
                        ) : null}
                      </p>
                    </div>
                  ) : null}

                  <CustomText
                    placeholder="Alamat Email"
                    type="email"
                    className="mt-4"
                    value={this.state.email}
                    onChange={(e) => this.inputHandler(e, "email")}
                  />
                  <CustomText
                    placeholder="Kata Sandi"
                    type="password"
                    className="mt-4"
                    value={this.state.password}
                    onChange={(e) => this.inputHandler(e, "password")}
                  />

                  <CustomButton
                    type="contained"
                    className="mt-4 full text-center"
                    onClick={this.loginBtnHandler}
                  >
                    Masuk
                  </CustomButton>
                </div>
                <div class="card-footer text-muted">
                  <div className="float-right">
                    <a
                      href="#"
                      onClick={this.forgotPasswordToggle}
                      style={{ textDecoration: "none" }}
                    >
                      Lupa Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={this.state.forgotPasswordShow}
          onHide={this.forgotPasswordToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Lupa Password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <CustomText
              placeholder="Alamat Email"
              type="email"
              value={this.state.forgotPassword}
              onChange={(e) => this.inputHandler(e, "forgotPassword")}
            />
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center"
              onClick={this.forgotPasswordBtnHandler}
            >
              Kirim
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

const mapDispatchToProps = {
  onLogin: loginHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
