//libraries
import React from "react";
import { Accordion, Card } from "react-bootstrap";

//components
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

class Profile extends React.Component {
  render() {
    return (
      <section>
        <div className="w-100 p-5">
          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <h5>Thomas Aryanto</h5>
                  <p className="pt-2 text-muted">Total investasi</p>
                  <h5>Rp.2.000.000</h5>
                  <p className="pt-2 text-muted">Total imbal hasil</p>
                  <h5 className="pb-2">
                    Rp.120.000 <small>(+1,8%)</small>
                  </h5>

                  <hr />

                  <CustomButton
                    type="textual"
                    className="block borderless pt-2"
                  >
                    Profil
                  </CustomButton>

                  <CustomButton type="textual" className="block borderless">
                    Portfolio
                  </CustomButton>

                  <CustomButton type="textual" className="block borderless">
                    Transaksi
                  </CustomButton>

                  <CustomButton
                    type="textual"
                    className="block borderless pb-2"
                  >
                    Pengaturan
                  </CustomButton>

                  <hr />

                  <CustomButton
                    type="textual"
                    className="block borderless pt-2"
                  >
                    Keluar
                  </CustomButton>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        <strong>Data Diri Nasabah </strong>
                        <p class="float-right">▼</p>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div className="col-lg-9">
                                  <p>
                                    Anda dapat mengubah detail data diri di
                                    sini, beberapa data mungkin membutuhkan
                                    verifikasi dari sistem kami.
                                  </p>
                                </div>
                                <div className="col-lg-3">
                                  <div className="float-right">
                                    <CustomButton
                                      type="contained"
                                      className="small bg-primary borderless ml-2"
                                    >
                                      Ubah Profil
                                    </CustomButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-lg-4">
                              <strong className="text-muted small">
                                Nama sesuai identitas
                              </strong>
                              <p className="pb-3">Thomas Aryanto</p>

                              <strong className="text-muted small">
                                Email
                              </strong>
                              <p className="pb-3">
                                thomas.ariyanto30@gmail.com
                              </p>

                              <strong className="text-muted small">
                                Tempat Lahir
                              </strong>
                              <p className="pb-3">Bekasi</p>

                              <strong className="text-muted small">
                                Jenis Kelamin
                              </strong>
                              <p className="pb-3">Laki-laki</p>
                            </div>
                            <div className="col-lg-4">
                              <strong className="text-muted small">
                                No. KTP
                              </strong>
                              <p className="pb-3">3275013004970014</p>

                              <strong className="text-muted small">
                                No. Ponsel
                              </strong>
                              <p className="pb-3">081231997068</p>

                              <strong className="text-muted small">
                                Tanggal Lahir
                              </strong>
                              <p className="pb-3">30 April 1997</p>

                              <strong className="text-muted small">
                                Agama
                              </strong>
                              <p className="pb-3">Katholik</p>
                            </div>
                            <div className="col-lg-4">
                              <strong className="text-muted small">
                                Pekerjaan
                              </strong>
                              <p className="pb-3">Pegawai Swasta</p>

                              <strong className="text-muted small">
                                Penghasilan
                              </strong>
                              <p className="pb-3">10 Juta - 50 Juta/tahun</p>

                              <strong className="text-muted small">
                                Sumber penghasilan
                              </strong>
                              <p className="pb-3">Gaji</p>

                              <strong className="text-muted small">
                                Tujuan investasi
                              </strong>
                              <p className="pb-3">
                                Keuntungan dari selisih harga
                              </p>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        <strong>Rekening Bank</strong>
                        <p class="float-right">▼</p>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <Card className="h-100">
                            <Card.Body className="d-flex align-items-center">
                              <div className="col-lg-1">
                                <p>logo</p>
                              </div>
                              <div className="col-lg-8">
                                <p className="text-muted">CIMB NIAGA</p>
                                <strong>Thomas Aryanto</strong>
                                <p className="text-muted">0110877111</p>
                              </div>
                              <div className="col-lg-3">
                                <div className="float-right">
                                  <CustomButton
                                    type="contained"
                                    className="small bg-primary borderless ml-2"
                                  >
                                    Ubah
                                  </CustomButton>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        <strong>Profil Resiko</strong>
                        <p class="float-right">▼</p>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="row">
                            <div className="col-lg-4">image</div>
                            <div className="col-lg-8">
                              <strong>Profil Risiko A (Agresif Rendah)</strong>
                              <hr />
                              <p>
                                Tipe ini adalah investor yang kurang menyukai
                                risiko dan cenderung menginginkan pokok
                                investasinya tidak berkurang, konsekuensinya
                                tipe ini rela mendapatkan imbal hasil (return)
                                investasinya tidak tinggi. Pengetahuan investor
                                tentang industri dan produk Investasi tidak
                                terlalu dalam.
                              </p>
                              <br />
                              <p>
                                Produk yang cocok untuk tipe ini adalah Reksa
                                Dana Pasar Uang dan/atau SBN Ritel. Reksa Dana
                                Pasar Uang dapat digunakan untuk investasi
                                jangka pendek (kurang dari 1 tahun atau hingga 1
                                tahun), sementara SBN Ritel digunakan untuk
                                investasi jangka menengah hingga jangka panjang.
                              </p>
                              <hr />
                              <div className="float-right">
                                <CustomButton
                                  type="contained"
                                  className="small bg-primary borderless ml-2"
                                >
                                  Ubah Profil Resiko
                                </CustomButton>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
