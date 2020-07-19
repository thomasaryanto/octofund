//libraries
import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { Helmet } from "react-helmet";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import ProductCard from "../../components/Cards/ProductCard";

const sortKeyList = [
  { key: "id", name: "Tanggal Dibuat" },
  { key: "name", name: "Nama" },
  { key: "lastPrice", name: "Harga" },
];

const sortTypeList = [
  { key: "asc", name: "Menaik" },
  { key: "desc", name: "Menurun" },
];

const filterCategoryList = [
  { key: 1, name: "Pasar Uang" },
  { key: 2, name: "Pendapatan Tetap" },
  { key: 3, name: "Campuran" },
  { key: 4, name: "Saham" },
];

class Product extends React.Component {
  state = {
    mutualFundData: [],
    keyword: "",
    sortKey: "",
    sortType: "",
    filterKey: "none",
    filterValue: "",
    filterMinPrice: 0,
    filterMaxPrice: 0,
    selectedSortKey: null,
    selectedSortType: null,
    selectedFilterCategory: null,
    sortShow: false,
    filterCategoryShow: false,
    filterPriceShow: false,
    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentWillMount() {
    this.getMutualFundListData(
      this.state.filterKey,
      this.state.filterValue,
      this.state.sortKey,
      this.state.sortType,
      this.state.keyword,
      this.state.activePage
    );
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  sortToggle = () => {
    this.setState({ sortShow: !this.state.sortShow });
  };

  filterCategoryToggle = () => {
    this.setState({ filterCategoryShow: !this.state.filterCategoryShow });
  };

  filterPriceToggle = () => {
    this.setState({ filterPriceShow: !this.state.filterPriceShow });
  };

  pageChangeHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.refreshData();
    });
  };

  refreshData = () => {
    this.getMutualFundListData(
      this.state.filterKey,
      this.state.filterValue,
      this.state.sortKey,
      this.state.sortType,
      this.state.keyword,
      this.state.activePage
    );
  };

  searchBtnHandler = () => {
    this.setState({ activePage: 1 }, () => {
      this.refreshData();
    });
  };

  resetFilter = () => {
    this.setState(
      {
        activePage: 1,
        filterKey: "none",
        filterValue: "",
        selectedFilterCategory: null,
      },
      () => {
        this.refreshData();
      }
    );
  };

  filterCategoryHandler = (e) => {
    this.setState(
      {
        activePage: 1,
        filterKey: "category",
        filterValue: e.key,
        selectedFilterCategory: {
          key: e.key,
          name: e.name,
        },
        filterMinPrice: 0,
        filterMaxPrice: 0,
      },
      () => {
        this.refreshData();
      }
    );
  };

  filterPriceHandler = () => {
    if (this.state.filterMinPrice > this.state.filterMaxPrice) {
      this.setState({
        filterMinPrice: 0,
        filterMaxPrice: 0,
      });
      return swal(
        "Terjadi kesalahan!",
        "Harga maksimum harus lebih besar daripada harga minimum!",
        "error"
      );
    }
    this.setState(
      {
        activePage: 1,
        filterKey: "price",
        filterValue: `${this.state.filterMinPrice}-${this.state.filterMaxPrice}`,
        selectedFilterCategory: null,
      },
      () => {
        this.refreshData();
      }
    );
  };

  sortKeyListHandler = (e) => {
    this.setState(
      {
        activePage: 1,
        sortKey: e.key,
        selectedSortKey: {
          key: e.key,
          name: e.name,
        },
      },
      () => {
        this.refreshData();
      }
    );
  };

  sortTypeListHandler = (e) => {
    this.setState(
      {
        activePage: 1,
        sortType: e.key,
        selectedSortType: {
          key: e.key,
          name: e.name,
        },
      },
      () => {
        this.refreshData();
      }
    );
  };

  getMutualFundListData = (
    filterKey,
    filterValue,
    sortKey,
    sortType,
    keyword,
    page
  ) => {
    Axios.get(`${API_URL}/mutualfund`, {
      params: {
        page: page - 1,
        size: 6,
        filterKey: filterKey,
        filterValue: filterValue,
        sortKey: sortKey,
        sortType: sortType,
        keyword: keyword,
      },
    })
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ mutualFundData: res.data.content });
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
      <>
        <Helmet>
          <style>{"body { background: #f4f5f4 !important; }"}</style>
        </Helmet>
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
                        <div className="col-lg-8 d-flex pt-3 pt-lg-0">
                          <CustomText
                            className="small"
                            placeholder="Masukkan nama reksadana..."
                            onChange={(e) => this.inputHandler(e, "keyword")}
                          />

                          <CustomButton
                            type="contained"
                            className="small bg-primary borderless ml-2"
                            onClick={this.searchBtnHandler}
                          >
                            Pencarian
                          </CustomButton>
                        </div>
                        <div className="col-lg-4 d-flex pt-3 pt-lg-0">
                          <div className="ml-lg-auto">
                            <CustomButton
                              type="contained"
                              className="small"
                              onClick={this.filterPriceToggle}
                            >
                              ☰ Harga
                            </CustomButton>
                            <CustomButton
                              type="contained"
                              className="small ml-2"
                              onClick={this.filterCategoryToggle}
                            >
                              ☰ Kategori
                            </CustomButton>
                            <CustomButton
                              type="contained"
                              className="small ml-2"
                              onClick={this.sortToggle}
                            >
                              ↕ Sort
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {this.state.totalItemsCount > 0 ? (
                  this.renderMutualFunds()
                ) : (
                  <h1>Belum ada data</h1>
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
        {/* sort modal */}
        <Modal show={this.state.sortShow} onHide={this.sortToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Urut Berdasarkan</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Select
              value={this.state.selectedSortKey}
              getOptionValue={(option) => option.key}
              getOptionLabel={(option) => option.name}
              onChange={this.sortKeyListHandler}
              options={sortKeyList}
              placeholder="Urutkan menurut..."
            />
            <br />
            <Select
              value={this.state.selectedSortType}
              getOptionValue={(option) => option.key}
              getOptionLabel={(option) => option.name}
              onChange={this.sortTypeListHandler}
              options={sortTypeList}
              placeholder="Urutan..."
            />
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={this.sortToggle}
            >
              Tutup
            </CustomButton>
          </Modal.Footer>
        </Modal>

        {/* filter category modal */}
        <Modal
          show={this.state.filterCategoryShow}
          onHide={this.filterCategoryToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filter Kategori</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Select
              value={this.state.selectedFilterCategory}
              getOptionValue={(option) => option.key}
              getOptionLabel={(option) => option.name}
              onChange={this.filterCategoryHandler}
              options={filterCategoryList}
              placeholder="Pilih Kategori..."
            />
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center bg-primary borderless ml-2"
              onClick={() => {
                this.resetFilter();
                this.filterCategoryToggle();
              }}
            >
              Reset
            </CustomButton>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={this.filterCategoryToggle}
            >
              Tutup
            </CustomButton>
          </Modal.Footer>
        </Modal>

        {/* filter price modal */}
        <Modal
          show={this.state.filterPriceShow}
          onHide={this.filterPriceToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filter Harga</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <strong className="text-muted small">Harga Minimum</strong>
            <CustomText
              className="mb-3"
              value={this.state.filterMinPrice}
              onChange={(e) => this.inputHandler(e, "filterMinPrice")}
            />

            <strong className="text-muted small">Harga Maksimum</strong>
            <CustomText
              className="mb-3"
              value={this.state.filterMaxPrice}
              onChange={(e) => this.inputHandler(e, "filterMaxPrice")}
            />
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center bg-primary borderless ml-2"
              onClick={() => {
                this.resetFilter();
                this.filterPriceToggle();
              }}
            >
              Reset
            </CustomButton>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={() => {
                this.filterPriceHandler();
                this.filterPriceToggle();
              }}
            >
              Filter
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Product;
