import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import swal from "sweetalert";
import { connect } from "react-redux";

class MemberSideBar extends React.Component {
  state = {
    totalInvestment: 0,
    totalYields: 0,
    percentYields: 0,
  };

  componentDidMount() {
    this.getPortfolio();
  }

  getPortfolio = () => {
    Axios.get(`${API_URL}/portfolios/member/${this.props.user.id}/all`)
      .then((res) => {
        let totalInvestment = 0;
        let nowInvestment = 0;
        res.data.forEach(({ totalInvest, totalUnit, mutualFund }) => {
          totalInvestment = totalInvestment + totalInvest;
          nowInvestment = nowInvestment + totalUnit * mutualFund.lastPrice;
        });

        this.setState({
          totalInvestment: nowInvestment,
          totalYields: nowInvestment - totalInvestment,
          percentYields: (
            ((nowInvestment - totalInvestment) / totalInvestment) *
            100
          ).toFixed(2),
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  render() {
    return (
      <div className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <img
              src={this.props.user.member.selfiePhoto}
              height="100"
              width="100"
              className="rounded-circle mx-auto d-block"
            />
            <h5 className="text-center pt-2">{this.props.user.name}</h5>
            <hr />
            <p className=" text-muted">Total investasi</p>
            <h5>Rp.{this.state.totalInvestment}</h5>
            <p className="pt-2 text-muted">Total imbal hasil</p>
            <h5 className="pb-2">
              Rp.{this.state.totalYields}{" "}
              <small>({this.state.percentYields}%)</small>
            </h5>

            <hr />

            <Link to="/member" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless pt-2"
                style={{ color: "#007BFF" }}
              >
                Profil
              </CustomButton>
            </Link>

            <hr />

            <Link to="/member/portfolio" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Portfolio
              </CustomButton>
            </Link>

            <hr />

            <Link to="/member/transaction" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Transaksi
              </CustomButton>
            </Link>

            <hr />

            <Link to="/member/bankaccount" style={{ textDecoration: "none" }}>
              <CustomButton
                type="textual"
                className="block borderless"
                style={{ color: "#007BFF" }}
              >
                Rekening
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

export default connect(mapStateToProps)(MemberSideBar);
