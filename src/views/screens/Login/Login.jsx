//libraries
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

// actions
import { loginHandler } from "../../../redux/actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

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

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  render() {
    if (this.props.user.id != 0) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid" style={{ height: "100%" }}>
        <div class="row justify-content-center pt-5">
          <div class="col-lg-5">
            <div class="card">
              <div class="card-header">Masuk</div>
              <div class="card-body">
                {this.props.user.msg ? (
                  <div className="alert alert-danger mt-3">
                    <p className="text-center">{this.props.user.msg}</p>
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
            </div>
          </div>
        </div>
      </div>
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
