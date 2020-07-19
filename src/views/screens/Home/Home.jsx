//libraries
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

//components
import CustomButton from "../../components/CustomButton/CustomButton";

class Home extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <style>{"body { background: #f4f5f4 !important; }"}</style>
        </Helmet>
        <div className="container-fluid p-0">
          <section className="d-flex align-items-center text-center image">
            <div className="w-100">
              <h1 className="jumbo white">Investasi mulai di OctoFund</h1>
              <p className="white">
                Pionir platform investasi di Indonesia. Di OctoFund, investasi
                semudah belanja online!
              </p>
              <br />
              {this.props.user.id != 0 ? (
                <Link to="/product">
                  <CustomButton
                    type="contained"
                    className="bg-primary borderless"
                  >
                    Investasi Sekarang
                  </CustomButton>
                </Link>
              ) : (
                <Link to="/register">
                  <CustomButton
                    type="contained"
                    className="bg-primary borderless"
                  >
                    Daftar Sekarang
                  </CustomButton>
                </Link>
              )}
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Home);
