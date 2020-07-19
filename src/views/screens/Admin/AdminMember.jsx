//libraries
import React from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Pagination from "react-js-pagination";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import ListCard from "../../components/Cards/ListCard";
import AdminSideBar from "../../components/SideBar/AdminSideBar";

class AdminMember extends React.Component {
  state = {
    userData: [],
    userDataShow: false,
    acceptUserShow: false,
    rejectUserShow: false,
    sid: "",
    ifua: "",
    rejectMsg: "",
    activeUser: {
      member: {},
      bankAccounts: [
        {
          bank: {},
        },
      ],
    },

    activePage: 1,
    totalPages: null,
    itemsCountPerPage: null,
    totalItemsCount: null,
  };

  componentDidMount() {
    this.getUserListData(this.state.activePage);
  }

  inputHandler = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getUserListData(this.state.activePage);
    });
  };

  getUserListData = (page) => {
    Axios.get(`${API_URL}/users/role/3`, {
      params: {
        page: page - 1,
        size: 4,
      },
    })
      .then((res) => {
        const totalPages = res.data.totalPages;
        const itemsCountPerPage = res.data.size;
        const totalItemsCount = res.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });
        this.setState({ userData: res.data.content });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  getUserData = (id) => {
    Axios.get(`${API_URL}/users/${id}`)
      .then((res) => {
        this.setState({ activeUser: res.data });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        swal("Terjadi kesalahan!", errorMessage, "error");
      });
  };

  renderUsers = () => {
    return this.state.userData.map(({ member, id, name, email }) => {
      return (
        <ListCard
          image={member.selfiePhoto}
          textTop={member.identityNumber}
          textMiddle={name}
          textBottom={email}
          editText="Detail"
          editClick={() => {
            this.detailBtnHandler(id);
          }}
          deleteClick={() => {
            this.deleteBtnHandler(id);
          }}
        />
      );
    });
  };

  userDataToggle = () => {
    console.log(this.state.activeUser);
    this.setState({ userDataShow: !this.state.userDataShow });
  };

  detailBtnHandler = (id) => {
    this.getUserData(id);
    this.userDataToggle();
  };

  deleteBtnHandler = (id) => {
    swal({
      title: "Danger Zone!",
      text: "Kamu yakin akan menghapus data ini?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Axios.delete(`${API_URL}/users/${id}`)
          .then((res) => {
            swal("Data berhasil dihapus!", {
              icon: "success",
            });
            this.getUserListData(this.state.activePage);
          })
          .catch((err) => {
            const errorMessage = err.response
              ? err.response.data.errors.join("\n")
              : err.message;
            swal("Terjadi kesalahan!", errorMessage, "error");
          });
      } else {
        swal("Data batal dihapus!");
      }
    });
  };

  render() {
    return (
      <>
        <div className="container-fluid image">
          <div className="w-100 p-5">
            <div className="row">
              <AdminSideBar />
              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body">
                    <h3>
                      Manajemen Nasabah{" "}
                      <span class="badge badge-pill badge-primary">
                        {this.state.totalItemsCount}
                      </span>
                    </h3>
                    <hr />
                    <div>{this.renderUsers()}</div>
                    <hr />

                    <Pagination
                      hideDisabled
                      hideNavigation
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.itemsCountPerPage}
                      totalItemsCount={this.state.totalItemsCount}
                      pageRangeDisplayed={10}
                      itemClass="page-item"
                      linkClass="page-link"
                      innerClass="pagination justify-content-center"
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          size="lg"
          show={this.state.userDataShow}
          onHide={this.userDataToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Data Nasabah</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey="data">
              <Tab eventKey="data" title="Data Diri">
                <br />
                <div className="row">
                  <div className="col-lg-4">
                    <strong className="text-muted small">
                      Nama sesuai identitas
                    </strong>
                    <p className="pb-3">{this.state.activeUser.name}</p>

                    <strong className="text-muted small">Email</strong>
                    <p className="pb-3">{this.state.activeUser.email}</p>

                    <strong className="text-muted small">Username</strong>
                    <p className="pb-3">{this.state.activeUser.username}</p>

                    <strong className="text-muted small">No. Ponsel</strong>
                    <p className="pb-3">{this.state.activeUser.phone}</p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">No. KTP</strong>
                    <p className="pb-3">
                      {this.state.activeUser.member.identityNumber}
                    </p>

                    <strong className="text-muted small">Alamat</strong>
                    <p className="pb-3">
                      {this.state.activeUser.member.address}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">Agama</strong>
                    <p className="pb-3">
                      {this.state.activeUser.member.religion}
                    </p>

                    <strong className="text-muted small">Jenis Kelamin</strong>
                    <p className="pb-3">{this.state.activeUser.member.sex}</p>

                    <strong className="text-muted small">Pekerjaan</strong>
                    <p className="pb-3">{this.state.activeUser.member.job}</p>

                    <strong className="text-muted small">
                      Status Pernikahan
                    </strong>
                    <p className="pb-3">
                      {this.state.activeUser.member.maritalStatus}
                    </p>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="accounts" title="Data Rekening">
                <br />
                <div className="row">
                  <div className="col-lg-4">
                    <strong className="text-muted small">Nama Bank</strong>
                    <p className="pb-3">
                      {this.state.activeUser.bankAccounts[0].bank.shortName}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">No. Rekening</strong>
                    <p className="pb-3">
                      {this.state.activeUser.bankAccounts[0].accountNumber}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">Nama Pemegang</strong>
                    <p className="pb-3">
                      {this.state.activeUser.bankAccounts[0].holderName}
                    </p>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="photo" title="Berkas Pendukung">
                <br />

                <div className="row">
                  <div className="col-lg-4">
                    <strong className="text-muted small">Foto KTP</strong>
                    <a
                      href={this.state.activeUser.member.identityPhoto}
                      target="_blank"
                    >
                      <img
                        src={this.state.activeUser.member.identityPhoto}
                        width="200"
                        height="100"
                      />
                    </a>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">Foto Selfie</strong>
                    <br />
                    <a
                      href={this.state.activeUser.member.selfiePhoto}
                      target="_blank"
                    >
                      <img
                        src={this.state.activeUser.member.selfiePhoto}
                        width="200"
                        height="100"
                      />
                    </a>
                  </div>
                  <div className="col-lg-4">
                    <strong className="text-muted small">Tanda Tangan</strong>
                    <a
                      href={this.state.activeUser.member.signature}
                      target="_blank"
                    >
                      <img
                        src={this.state.activeUser.member.signature}
                        width="200"
                        height="100"
                      />
                    </a>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <CustomButton
              type="contained"
              className="text-center ml-2"
              onClick={() => {
                this.userDataToggle();
                this.rejectUserToggle();
              }}
            >
              Tolak
            </CustomButton>
            <CustomButton
              type="contained"
              className="bg-primary borderless"
              onClick={() => {
                this.userDataToggle();
                this.acceptUserToggle();
              }}
            >
              Terima
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AdminMember;
