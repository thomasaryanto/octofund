import React from "react";
import { Card } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";

interface UserCardData {
  id?: number;
  identityNumber?: string;
  name?: string;
  email?: string;
  selfiePhoto?: string;
}

type UserCardProps = {
  data?: UserCardData;
  className?: string;
};

class UserCard extends React.Component<UserCardProps> {
  // render() {
  //   const { identityNumber, name, email, selfiePhoto } = this.props.data;
  //   return (
  //     <Card.Body>
  //       <Card className="h-100">
  //         <Card.Body
  //           className={`d-flex align-items-center ${this.props.className}`}
  //         >
  //           <div className="col-lg-1">
  //             <p>{selfiePhoto}</p>
  //           </div>
  //           <div className="col-lg-8">
  //             <p className="text-muted">{identityNumber}</p>
  //             <strong>{name}</strong>
  //             <p className="text-muted">{email}</p>
  //           </div>
  //           <div className="col-lg-3">
  //             <div className="float-right">
  //               <CustomButton
  //                 type="contained"
  //                 className="small bg-primary borderless ml-2"
  //               >
  //                 Ubah
  //               </CustomButton>
  //             </div>
  //           </div>
  //         </Card.Body>
  //       </Card>
  //     </Card.Body>
  //   );
  // }
}

export default UserCard;
