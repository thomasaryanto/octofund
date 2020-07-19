import React from "react";
import { Link } from "react-router-dom";
import { AreaChart, Area } from "recharts";

class ProductCard extends React.Component {
  render() {
    const { id, name, lastPrice, manager, priceHistory } = this.props.data;
    const priceChart = [...priceHistory];
    console.log(priceHistory);
    const percentYields = Math.abs(
      (
        ((priceHistory[priceHistory.length - 2].price -
          priceHistory[priceHistory.length - 1].price) /
          priceHistory[priceHistory.length - 2].price) *
        100
      ).toFixed(2)
    );
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
                      priceHistory[priceHistory.length - 2].price -
                        priceHistory[priceHistory.length - 1].price <=
                      0
                        ? "#86b783"
                        : "#ab5d4c"
                    }
                    fill={
                      priceHistory[priceHistory.length - 2].price -
                        priceHistory[priceHistory.length - 1].price <=
                      0
                        ? "#86b783"
                        : "#ab5d4c"
                    }
                  />
                </AreaChart>
              </div>
              <div className="col-lg-5 d-flex pt-4 pt-lg-0">
                <div className="ml-lg-auto">
                  <h5>Rp {lastPrice}</h5>
                  {priceHistory[priceHistory.length - 2].price -
                    priceHistory[priceHistory.length - 1].price <=
                  0 ? (
                    <p className="small text-success">+{percentYields}%</p>
                  ) : (
                    <p className="small text-danger">-{percentYields}%</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
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
