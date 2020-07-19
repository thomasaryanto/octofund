//libraries
import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";

//components
import PackageCard from "../../components/Cards/PackageCard";

class Package extends React.Component {
  state = {
    mutualFundPackageData: [],
    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentWillMount() {
    this.getMutualFundPackageListData(this.state.activePage);
  }

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getMutualFundPackageListData(this.state.activePage);
    });
  };

  getMutualFundPackageListData = (page) => {
    Axios.get(`${API_URL}/packages`, {
      params: {
        page: page - 1,
        size: 6,
      },
    })
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ mutualFundPackageData: res.data.content });
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
      <>
        <Helmet>
          <style>{"body { background: #f4f5f4 !important; }"}</style>
        </Helmet>
        <div className="container-fluid p-0">
          <section className="d-flex align-items-center text-center header image">
            <div className="w-100 p-5">
              <h1 className="white">Paket Reksa Dana</h1>
              <p className="white">Pilih paket reksa dana impianmu sekarang!</p>
            </div>
          </section>
          <section>
            <div className="w-100 p-5">
              <div className="row">
                {this.state.totalItemsCount > 0 ? (
                  this.renderMutualFundPackages()
                ) : (
                  <h3 className="text-center">belum ada data.</h3>
                )}
              </div>
            </div>

            <div className="text-center pb-5">
              <Pagination
                hideDisabled
                hideNavigation
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={10}
                itemClass="page-item"
                linkClass="page-link"
                innerClass="pagination justify-content-center"
                onChange={this.pageChangeHandler.bind(this)}
              />
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Package;
