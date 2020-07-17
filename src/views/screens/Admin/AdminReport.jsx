//libraries
import React from "react";
import { Modal, Card, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import AdminSideBar from "../../components/SideBar/AdminSideBar";

const columns = [
  {
    name: "Nama Reksadana",
    selector: "name",
    sortable: true,
  },
  {
    name: "Total Transaksi",
    selector: "totalTransaction",
    sortable: true,
  },
  {
    name: "Total Unit",
    selector: "totalUnit",
    sortable: true,
  },
  {
    name: "Jumlah Transaksi",
    selector: "countTransaction",
    sortable: true,
  },
];

class AdminReport extends React.Component {
  state = {
    topBuyProducts: [],
    topBuyCharts: [],
    topSellProducts: [],
    topSellCharts: [],
  };

  componentDidMount() {
    this.getTopBuyProducts(1);
    this.getTopBuyProducts(2);
  }

  getTopBuyProducts = (type) => {
    Axios.get(`${API_URL}/mutualfund/statistics`, {
      params: {
        type,
      },
    })
      .then((res) => {
        const topThree = [...res.data].slice(0, 3);

        if (type == 1) {
          this.setState({
            topBuyProducts: res.data.map(
              ({
                id,
                name,
                totalTransaction,
                totalUnit,
                countTransaction,
              }) => ({
                id: id,
                name: name,
                totalTransaction: "Rp. " + totalTransaction,
                totalUnit: totalUnit.toFixed(2) + " unit",
                countTransaction: countTransaction + " kali",
              })
            ),
            topBuyCharts: topThree.map(({ name, totalTransaction }) => ({
              name,
              value: totalTransaction,
            })),
          });
        } else {
          this.setState({
            topSellProducts: res.data.map(
              ({
                id,
                name,
                totalTransaction,
                totalUnit,
                countTransaction,
              }) => ({
                id: id,
                name: name,
                totalTransaction: "Rp. " + totalTransaction,
                totalUnit: totalUnit.toFixed(2) + " unit",
                countTransaction: countTransaction + " kali",
              })
            ),
            topSellCharts: topThree.map(({ name, totalTransaction }) => ({
              name,
              value: totalTransaction,
            })),
          });
        }
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
      <div className="container-fluid image">
        <div className="w-100 p-5">
          <div className="row">
            <AdminSideBar />
            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <h3>Statistik Produk</h3>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-6 p-3">
                          <div class="card h-100">
                            <div class="card-header">
                              <p>Top 3 Pembelian Terbanyak</p>
                            </div>
                            <div className="card-body text-center d-flex align-items-center justify-content-center">
                              <PieChart width={200} height={200}>
                                <Pie
                                  dataKey="value"
                                  data={this.state.topBuyCharts}
                                  outerRadius={100}
                                  fill="#007BFF"
                                />
                                <Tooltip />
                              </PieChart>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 p-3">
                          <div class="card h-100">
                            <div class="card-header">
                              <p>Top 3 Penjualan Terbanyak</p>
                            </div>
                            <div className="card-body text-center d-flex align-items-center justify-content-center">
                              <PieChart width={200} height={200}>
                                <Pie
                                  dataKey="value"
                                  data={this.state.topSellCharts}
                                  outerRadius={100}
                                  fill="#FA5E6B"
                                />
                                <Tooltip />
                              </PieChart>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div class="card h-100">
                        <div className="card-body">
                          <DataTable
                            title="Statistik Pembelian"
                            columns={columns}
                            data={this.state.topBuyProducts}
                            paginationPerPage="5"
                            paginationRowsPerPageOptions={[5]}
                            pagination
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 pt-3">
                      <div class="card h-100">
                        <div className="card-body">
                          <DataTable
                            title="Statistik Penjualan"
                            columns={columns}
                            data={this.state.topSellProducts}
                            paginationPerPage="5"
                            paginationRowsPerPageOptions={[5]}
                            pagination
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminReport;
