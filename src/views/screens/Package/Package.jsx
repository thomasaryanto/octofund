//libraries
import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import PackageCard from "../../components/Cards/PackageCard";

class Package extends React.Component {
  state = {
    mutualFundPackageData: [],
  };

  componentWillMount() {
    this.getMutualFundPackageListData();
  }

  getMutualFundPackageListData = () => {
    Axios.get(`${API_URL}/packages`)
      .then((res) => {
        this.setState({ mutualFundPackageData: res.data });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  renderMutualFundPackages = () => {
    return this.state.mutualFundPackageData.map((val) => {
      return <PackageCard data={val} />;
    });
  };

  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center header image">
          <div className="w-100 p-5">
            <h1 className="white">Paket Reksa Dana</h1>
            <p className="white">Pilih paket reksa dana impianmu sekarang!</p>
          </div>
        </section>
        <section>
          <div className="w-100 p-5">
            <div className="row">{this.renderMutualFundPackages()}</div>
          </div>

          <div className="text-center pb-5">
            <CustomButton type="contained">▼ Lebih Banyak</CustomButton>
          </div>
        </section>
      </div>
    );
  }
}

export default Package;
