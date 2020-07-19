import React from "react";
import { Card } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";

class UserCard extends React.Component {
  render() {
    return (
      <Card className="h-100 mt-3">
        <Card.Body className={`d-flex align-items-center`}>
          <div className="col-lg-2">
            <img
              src={this.props.image}
              height="75"
              width="75"
              className="rounded-circle"
              alt="gambar"
            />
          </div>
          <div className="col-lg-7">
            <p className="text-muted">{this.props.textTop}</p>
            {this.props.titleClick ? (
              <strong>
                <a href="#" onClick={this.props.titleClick}>
                  {this.props.textMiddle}
                </a>
              </strong>
            ) : (
              <strong>{this.props.textMiddle}</strong>
            )}
            <p className="text-muted">{this.props.textBottom}</p>
          </div>
          <div className="col-lg-3">
            <div className="float-right">
              {this.props.customClick ? (
                <CustomButton
                  type="contained"
                  className="small bg-primary borderless ml-2"
                  onClick={this.props.customClick}
                >
                  {this.props.customText ? this.props.customText : "Custom"}
                </CustomButton>
              ) : null}

              {this.props.editClick ? (
                <CustomButton
                  type="contained"
                  className="small bg-primary borderless ml-2"
                  onClick={this.props.editClick}
                >
                  {this.props.editText ? this.props.editText : "Ubah"}
                </CustomButton>
              ) : null}

              {this.props.deleteClick ? (
                <CustomButton
                  type="contained"
                  className="small borderless ml-2"
                  onClick={this.props.deleteClick}
                >
                  {this.props.deleteText ? this.props.deleteText : "Hapus"}
                </CustomButton>
              ) : null}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default UserCard;
