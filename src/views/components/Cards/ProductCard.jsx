import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

class ProductCard extends React.Component {
  render() {
    const { id, name, lastPrice, manager, priceHistory } = this.props.data;
    console.log(priceHistory[0] - priceHistory[1]);
    const priceChart = [...priceHistory].reverse();
    const percentYields = (
      ((priceHistory[0].price - priceHistory[1].price) /
        priceHistory[0].price) *
      100
    ).toFixed(2);
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
                <AreaChart
                  width={200}
                  height={60}
                  data={priceChart}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={
                      priceHistory[0].price - priceHistory[1].price >= 0
                        ? "#86b783"
                        : "#ab5d4c"
                    }
                    fill={
                      priceHistory[0].price - priceHistory[1].price >= 0
                        ? "#86b783"
                        : "#ab5d4c"
                    }
                  />
                </AreaChart>
              </div>
              <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                <div className="ml-lg-auto">
                  <h5>Rp {lastPrice}</h5>
                  {priceHistory[0].price - priceHistory[1].price >= 0 ? (
                    <p className="small text-success">+{percentYields}%</p>
                  ) : (
                    <p className="small text-danger">{percentYields}%</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Link to={`/product/${id}`}>
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
