import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { connect } from "react-redux";

class AdminSideBar extends React.Component {
  render() {
    return (
      <div className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center pt-2">{this.props.user.name}</h5>
            <hr />
            <h6 className="text-center">Administrator</h6>
            <hr />
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless pt-2"
                style={{ color: "#007BFF" }}
              >
                Profil
              </CustomButton>
            </Link>

            <hr />

            <Link to="/admin/member" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Nasabah
              </CustomButton>
            </Link>

            <hr />

            <Link to="/admin/manager" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Manajer Investasi
              </CustomButton>
            </Link>

            <hr />

            <Link to="/admin/bank" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Bank
              </CustomButton>
            </Link>

            <hr />

            <Link to="/admin/report" style={{ textDecoration: "none" }}>
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

export default connect(mapStateToProps)(AdminSideBar);
