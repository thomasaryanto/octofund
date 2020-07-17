//libraries
import React from "react";
import { Link } from "react-router-dom";

//components
import CustomButton from "../../components/CustomButton/CustomButton";

class NotFound extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <section className="d-flex align-items-center text-center image">
          <div className="w-100">
            <h2 className="jumbo white">Sedang mencari Unicorn?</h2>
            <p className="white">
              Sama seperti unicorn, halaman yang kamu cari tidak ada.
            </p>
            <br />
            <Link to="/">
              <CustomButton type="contained" className="bg-primary borderless">
                Kembali
              </CustomButton>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default NotFound;
