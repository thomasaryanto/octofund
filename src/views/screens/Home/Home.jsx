import React from "react";

import arrow from "../../../assets/images/arrow.png";

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center pb-5 image">
          <div className="w-100">
            <h1 className="jumbo white">Investasi mulai di OctoFund</h1>
            <p className="white">
              Pionir platform investasi di Indonesia sejak 2013. Di OctoFund,
              investasi semudah belanja online!
            </p>

            <button className="btn btn-lg btn-info mt-3">
              Daftar Sekarang
            </button>

            <a class="btn-scroll" href="#more">
              <img alt="More" src={arrow} />
            </a>
          </div>
        </section>

        <section id="more">
          <div className="w-100 pt-5 pl-4">
            <h1>Kalkulator Investasi</h1>
          </div>
        </section>

        <section className="image">
          <div className="w-100 pt-5 pl-4">
            <h1 className="white">Artikel Investasi</h1>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
