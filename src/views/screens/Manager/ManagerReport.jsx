//libraries
import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";

//components
import ManagerSideBar from "../../components/SideBar/ManagerSideBar";

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

class ManagerReport extends React.Component {
  state = {
    topBuyProducts: [],
    topSellProducts: [],
  };

  componentDidMount() {
    this.getTopBuyProducts(1);
    this.getTopBuyProducts(2);
  }

  getTopBuyProducts = (type) => {
    Axios.get(
      `${API_URL}/mutualfund/statistics/manager/${this.props.user.id}`,
      {
        params: {
          type,
        },
      }
    )
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
            <ManagerSideBar />
            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <h3>Statistik Reksadana</h3>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ManagerReport);
