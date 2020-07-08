import React from "react";
import { Card } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";

class UserCard extends React.Component {
  render() {
    return (
      <Card className="h-100 mt-3">
        <Card.Body className={`d-flex align-items-center`}>
          <div className="col-lg-1">
            <p>
              <img src={this.props.image} />
            </p>
          </div>
          <div className="col-lg-8">
            <p className="text-muted">{this.props.textTop}</p>
            <strong>{this.props.textMiddle}</strong>
            <p className="text-muted">{this.props.textBottom}</p>
          </div>
          <div className="col-lg-3">
            <div className="float-right">
              {this.props.editOnly ? (
                <CustomButton
                  type="contained"
                  className="small bg-primary borderless ml-2"
                  onClick={this.props.editClick}
                >
                  {this.props.editText ? this.props.editText : "Ubah"}
                </CustomButton>
              ) : (
                <>
                  <CustomButton
                    type="contained"
                    className="small bg-primary borderless"
                    onClick={this.props.editClick}
                  >
                    {this.props.editText ? this.props.editText : "Ubah"}
                  </CustomButton>

                  <CustomButton
                    type="contained"
                    className="small borderless ml-2"
                    onClick={this.props.deleteClick}
                  >
                    {this.props.deleteText ? this.props.deleteText : "Hapus"}
                  </CustomButton>
                </>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default UserCard;
