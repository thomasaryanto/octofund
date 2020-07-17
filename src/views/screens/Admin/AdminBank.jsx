//libraries
import React from "react";
import { Modal, Card, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
import Select from "react-select";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";
import AdminSideBar from "../../components/SideBar/AdminSideBar";

class AdminBank extends React.Component {
  render() {
    return (
      <div className="container-fluid image">
        <div className="w-100 p-5">
          <div className="row">
            <AdminSideBar />
            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <h3>Coming soon!</h3>
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

export default AdminBank;
