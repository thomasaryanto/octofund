//libraries
import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Helmet } from "react-helmet";

//components
import CustomButton from "../../components/CustomButton/CustomButton";

class Payment extends React.Component {
  state = {
    transaction: {
      date: "",
      transactionStatus: {},
      mutualFund: {
        manager: {},
      },
    },
    paymentFile: null,
  };

  componentDidMount() {
    this.getTransactionData();
  }

  paymentFileHandler = (e) => {
    this.setState({ paymentFile: e.target.files[0] });
  };

  btnUploadHandler = () => {
    if (this.state.paymentFile == null) {
      return swal(
        "Terjadi kesalahan!",
        "Bukti transfer harus dipilih!",
        "error"
      );
    }

    let formData = new FormData();

    formData.append(
      "file",
      this.state.paymentFile,
      this.state.paymentFile.name
    );

    Axios.post(
      `${API_URL}/transactions/buy/confirm/${this.props.match.params.id}`,
      formData
    )
      .then((res) => {
        swal(
          "Konfirmasi berhasil!",
          "Transaksi pembelian akan segera diproses oleh manajer investasi.",
          "success"
        ).then(() => {
          this.props.history.push(`/member/transaction`);
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getTransactionData = () => {
    Axios.get(
      `${API_URL}/transactions/buy/payment/${this.props.match.params.id}`
    )
      .then((res) => {
        if (res.data == "") {
          this.props.history.push(`/`);
        }
        this.setState({
          transaction: {
            ...res.data,
          },
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
      <>
        <Helmet>
          <style>{"body { background: #f4f5f4 !important; }"}</style>
        </Helmet>
        <div className="container-fluid p-0">
          <section className="d-flex align-items-center text-center header image">
            <div className="w-100 p-5">
              {this.state.transaction.transactionStatus.id == 3 ? (
                <>
                  <h1 className="white">Konfirmasi Ulang Pembayaran</h1>
                  <p className="white">
                    Alasan penolakan: {this.state.transaction.rejectMessage}
                  </p>
                </>
              ) : (
                <h1 className="white">Konfirmasi Pembayaran</h1>
              )}
            </div>
          </section>
          <section>
            <div className="w-100 p-5">
              <div className="row">
                <div className="col-lg-6 p-3">
                  <div class="card shadow h-100">
                    <div class="card-header">
                      <p>Informasi Transaksi</p>
                    </div>
                    <div className="card-body">
                      <div class="table-responsive">
                        <table class="table table-sm table-borderless table-hover">
                          <tbody>
                            <tr>
                              <th scope="row">No Transaksi</th>
                              <td className="text-right">
                                {this.state.transaction.id}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Tanggal Transaksi</th>
                              <td className="text-right">
                                {this.state.transaction.date
                                  .split(".")[0]
                                  .replace("T", " ")}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Nama Produk</th>
                              <td className="text-right">
                                {this.state.transaction.mutualFund.name}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Manajer Investasi</th>
                              <td className="text-right">
                                {
                                  this.state.transaction.mutualFund.manager
                                    .companyName
                                }
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Jumlah Transaksi</th>
                              <td className="text-right">
                                Rp. {this.state.transaction.totalPrice}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Tujuan Transfer</th>
                              <td className="text-right">
                                {this.state.transaction.bankName}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 p-3">
                  <div class="card shadow h-100">
                    <div class="card-header">
                      <p>Informasi Pembayaran</p>
                    </div>
                    <div className="card-body text-center d-flex align-items-center justify-content-center">
                      <div className="col-lg-12">
                        {this.state.transaction.transactionStatus.id == 1 ||
                        this.state.transaction.transactionStatus.id == 3 ? (
                          <>
                            <h4 className="mb-4">Pilih Bukti Transfer</h4>

                            <input
                              accept="image/*"
                              type="file"
                              className="mb-3"
                              onChange={this.paymentFileHandler}
                            />
                            <CustomButton
                              type="contained"
                              className="mt-4 full"
                              onClick={this.btnUploadHandler}
                            >
                              Upload
                            </CustomButton>
                          </>
                        ) : (
                          <h4 className="mb-4">
                            Bukti transfer sudah diupload.
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Payment;
