import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

class ProductCard extends React.Component {
  render() {
    const { id, name, lastPrice, manager, priceHistory } = this.props.data;

    return (
      <div className="col-lg-4 p-3">
        <div class="card shadow">
          <div class="card-header">
            <p>{name}</p>
            <p className="small">{manager.companyName}</p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-7">
                <p className="pt-3 small">-- tempat chart --</p>
              </div>
              <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                <div className="ml-lg-auto">
                  <h5>Rp {lastPrice}</h5>
                  <p className="small text-success">+1,23%</p>
                </div>
              </div>
            </div>
          </div>
          <Link to={`/detail/${id}`}>
            <div class="card-footer bg-primary text-center white">
              <strong>BELI</strong>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductCard;
