import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

class PackageCard extends React.Component {
  render() {
    const { id, packageName, description, manager } = this.props.data;
    return (
      <div className="col-lg-4 p-3">
        <div class="card shadow">
          <div class="card-header">
            <p>{packageName}</p>
            <p className="small">{manager.companyName}</p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12 d-flex pt-4 pt-lg-0">
                <p>{description}</p>
              </div>
            </div>
          </div>
          <Link to={`/package/${id}`} style={{ textDecoration: "none" }}>
            <div class="card-footer bg-primary text-center white">
              <strong>BELI</strong>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default PackageCard;
