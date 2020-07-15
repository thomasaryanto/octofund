import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

class TransactionCard extends React.Component {
  render() {
    const {
      id,
      date,
      productName,
      managerName,
      mutualFund,
      totalPrice,
      transactionStatus,
    } = this.props.data;

    return (
      <div className="card mt-3">
        <div className="card-body pt-2">
          <div className="row pb-3">
            <div className="col-lg-12">
              <p className="text-muted small">{date}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <img
                src={mutualFund.manager.logo}
                height="75"
                width="75"
                className="rounded-circle"
              />
            </div>
            <div className="col-lg-5">
              <strong>{productName}</strong>
              <p className="text-muted small">{managerName}</p>
            </div>
            <div className="col-lg-3">
              <p className="text-muted small">Nilai transaksi</p>
              <strong>Rp {totalPrice}</strong>
            </div>
            <div className="col-lg-2">
              <p className="text-muted small">Nomor transaksi</p>
              <strong>{id}</strong>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <div className="float-left">
                <p className="text-muted small">Status transaksi</p>
                <strong>{transactionStatus.name}</strong>
              </div>
              <div className="float-right">
                <CustomButton
                  type="contained"
                  className="small bg-primary borderless"
                  onClick={this.props.onClick}
                >
                  Lihat Detail
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionCard;
