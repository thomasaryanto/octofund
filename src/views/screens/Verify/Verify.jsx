//libraries
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import swal from "sweetalert";

//components
import CustomButton from "../../components/CustomButton/CustomButton";

class Verify extends React.Component {
  state = {
    isSuccess: false,
    message: "",
  };

  componentDidMount() {
    Axios.get(`${API_URL}/users/verify/${this.props.match.params.token}`)
      .then((res) => {
        this.setState({
          isSuccess: true,
          message: res.data,
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        this.setState({
          isSuccess: false,
          message: errorMessage,
        });
      });
  }

  resendVerificationBtnHandler = () => {
    const userData = {
      token: this.props.match.params.token,
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

  render() {
    return (
      <div className="container-fluid" style={{ height: "100%" }}>
        <div class="row justify-content-center pt-5">
          <div class="col-lg-5">
            <div class="card">
              <div class="card-header">
                {this.state.isSuccess
                  ? "Verifikasi email berhasil."
                  : "Terjadi kesalahan!"}
              </div>
              <div class="card-body">
                <p className="text-center">{this.state.message}</p>
                {this.state.isSuccess ? (
                  <Link to="/login">
                    <CustomButton
                      type="contained"
                      className="mt-4 full text-center"
                    >
                      Masuk
                    </CustomButton>
                  </Link>
                ) : this.state.message.includes("kadaluarsa") ? (
                  <CustomButton
                    type="contained"
                    className="mt-4 full text-center"
                    onClick={this.resendVerificationBtnHandler}
                  >
                    Kirim Ulang Token
                  </CustomButton>
                ) : (
                  <Link to="/">
                    <CustomButton
                      type="contained"
                      className="mt-4 full text-center"
                    >
                      Kembali
                    </CustomButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Verify;
