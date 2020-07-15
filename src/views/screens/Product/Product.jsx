//libraries
import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import ProductCard from "../../components/Cards/ProductCard";

class Product extends React.Component {
  state = {
    mutualFundData: [],
  };

  componentWillMount() {
    this.getMutualFundListData();
  }

  getMutualFundListData = () => {
    Axios.get(`${API_URL}/mutualfund`)
      .then((res) => {
        this.setState({ mutualFundData: res.data });
      })
      .catch((err) => {
        console.log("testt");
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  renderMutualFunds = () => {
    return this.state.mutualFundData.map((val) => {
      return <ProductCard data={val} />;
    });
  };

  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center header image">
          <div className="w-100 p-5">
            <h1 className="white">Produk Reksa Dana</h1>
            <p className="white">Pilih reksa dana impianmu sekarang!</p>
          </div>
        </section>
        <section>
          <div className="w-100 p-5">
            <div className="row">
              <div className="col-lg-12">
                <div class="card shadow-sm mb-4">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-lg-6">
                        <CustomText
                          className="small"
                          placeholder="Pencarian.."
                        />
                      </div>
                      <div className="col-lg-6 d-flex pt-3 pt-lg-0">
                        <div className="ml-lg-auto">
                          <CustomButton type="contained" className="small">
                            ☰ Filter
                          </CustomButton>
                          <CustomButton type="contained" className="small ml-2">
                            ↕ Sort
                          </CustomButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {this.renderMutualFunds()}
            </div>
          </div>

          <div className="text-center pb-5">
            <CustomButton type="contained">▼ Lebih Banyak</CustomButton>
          </div>
        </section>
      </div>
    );
  }
}

export default Product;
