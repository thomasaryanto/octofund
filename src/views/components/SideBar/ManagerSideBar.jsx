import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { connect } from "react-redux";

class ManagerSideBar extends React.Component {
  render() {
    return (
      <div className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <img
              src={this.props.user.manager.logo}
              height="100"
              width="100"
              className="rounded-circle mx-auto d-block"
            />
            <h5 className="text-center pt-2">
              {this.props.user.manager.companyName}
            </h5>
            <hr />
            <p className=" text-muted">Penanggung Jawab</p>
            <strong>{this.props.user.name}</strong>
            <hr />
            <Link to="/manager" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless pt-2"
                style={{ color: "#007BFF" }}
              >
                Profil
              </CustomButton>
            </Link>

            <hr />

            <Link to="/manager/mutualfund" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Reksadana
              </CustomButton>
            </Link>

            <hr />

            <Link to="/manager/package" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Paket Reksadana
              </CustomButton>
            </Link>

            <hr />

            <Link to="/manager/transaction" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Transaksi
              </CustomButton>
            </Link>

            <hr />

            <Link to="/manager/bankaccount" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Rekening
              </CustomButton>
            </Link>

            <hr />

            <Link to="/manager/report" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Report
              </CustomButton>
            </Link>

            <hr />
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

export default connect(mapStateToProps)(ManagerSideBar);
