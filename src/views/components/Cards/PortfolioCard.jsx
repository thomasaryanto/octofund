import React from "react";
import CustomButton from "../CustomButton/CustomButton";

class PortfolioCard extends React.Component {
  render() {
    const { id, totalInvest, totalUnit, mutualFund } = this.props.data;

    const totalFund = parseInt(totalUnit * mutualFund.lastPrice);
    const yields = totalFund - totalInvest;
    const percentYields = ((yields / totalInvest) * 100).toFixed(2);
    const avgPrice = totalInvest / totalUnit;

    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-2">
              <img
                src={mutualFund.manager.logo}
                height="75"
                width="75"
                className="rounded-circle"
              />
            </div>
            <div className="col-lg-10">
              <p className="text-muted small">
                {mutualFund.mutualFundCategory.name}
              </p>
              <strong>{mutualFund.name}</strong>
              <p className="text-muted small">
                {mutualFund.manager.companyName}
              </p>
              <div className="row pt-3">
                <div className="col-lg-4">
                  <p className="text-muted small">Jumlah Unit</p>
                  <p className="pb-3">{totalUnit.toFixed(2)}</p>

                  <p className="text-muted small">Nilai semula</p>
                  <p className="pb-3">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumIntegerDigits: 1,
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(totalInvest)}
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="text-muted small">Harga / unit terkahir</p>
                  <p className="pb-3">Rp {mutualFund.lastPrice.toFixed(2)}</p>

                  <p className="text-muted small">Nilai sekarang</p>
                  <p className="pb-3">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumIntegerDigits: 1,
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(totalFund)}
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="text-muted small">Harga / unit rata-rata</p>
                  <p className="pb-3">Rp {avgPrice.toFixed(2)}</p>

                  <p className="text-muted small">Imbal hasil</p>
                  <p className="pb-3">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumIntegerDigits: 1,
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(yields)}
                    <small>({percentYields}%)</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="float-right">
            <CustomButton
              type="contained"
              className="small mr-2"
              onClick={this.props.sellClick}
            >
              Jual
            </CustomButton>

            <CustomButton
              type="contained"
              className="small bg-primary borderless"
              onClick={this.props.buyClick}
            >
              Beli Lagi
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioCard;
