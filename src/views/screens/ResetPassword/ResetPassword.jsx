//libraries
import React from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import swal from "sweetalert";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class ResetPassword extends React.Component {
  state = {
    message: "",
    password: "",
    confirmationPassword: "",
    email: "",
    isSuccess: false,
  };

  componentDidMount() {
    Axios.get(`${API_URL}/users/reset/${this.props.match.params.token}`)
      .then((res) => {
        this.setState({
          email: res.data,
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        this.setState({
          message: errorMessage,
        });
      });
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  resetBtnHandler = () => {
    console.log(this.state);
    if (this.state.password == this.state.confirmationPassword) {
      const userData = {
        token: this.props.match.params.token,
        password: this.state.password,
      };
      Axios.post(`${API_URL}/users/reset/send/`, userData)
        .then((res) => {
          swal("Berhasil!", res.data, "success");
          this.setState({
            isSuccess: true,
          });
        })
        .catch((err) => {
          console.log(err);
          const errorMessage = err.response
            ? err.response.data.errors.join("\n")
            : err.message;

          swal("Terjadi kesalahan!", errorMessage, "error");
        });
    } else {
      swal("Terjadi kesalahan!", "Kata sandi tidak cocok!", "error");
    }
  };

  render() {
    if (this.state.isSuccess) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid" style={{ height: "100%" }}>
        <div class="row justify-content-center pt-5">
          <div class="col-lg-5">
            <div class="card">
              <div class="card-header">
                {this.state.email
                  ? `Reset Kata Sandi (${this.state.email})`
                  : "Terjadi kesalahan!"}
              </div>
              <div class="card-body">
                {this.state.email ? (
                  <>
                    <CustomText
                      placeholder="Kata Sandi Baru"
                      type="password"
                      className="mt-4"
                      value={this.state.password}
                      onChange={(e) => this.inputHandler(e, "password")}
                    />
                    <CustomText
                      placeholder="Konfirmasi Kata Sandi Baru"
                      type="password"
                      className="mt-4"
                      value={this.state.confirmationPassword}
                      onChange={(e) =>
                        this.inputHandler(e, "confirmationPassword")
                      }
                    />

                    <CustomButton
                      type="contained"
                      className="mt-4 full text-center"
                      onClick={this.resetBtnHandler}
                    >
                      Ubah Kata Sandi
                    </CustomButton>
                  </>
                ) : (
                  <>
                    <p className="text-center">{this.state.message}</p>
                    <Link to="/">
                      <CustomButton
                        type="contained"
                        className="mt-4 full text-center"
                      >
                        Kembali
                      </CustomButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
