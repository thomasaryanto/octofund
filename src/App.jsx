//libraries
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

//redux
import { userKeepLogin, cookieChecker } from "./redux/actions";

//styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

//components
import NavigationBar from "./views/components/NavigationBar/NavigationBar";
import Footer from "./views/components/Footer/Footer";

//screens
import Home from "./views/screens/Home/Home";
import Product from "./views/screens/Product/Product";
import Detail from "./views/screens/Detail/Detail";
import Profile from "./views/screens/Profile/Profile";
import Portfolio from "./views/screens/Portfolio/Portfolio";
import Transaction from "./views/screens/Transaction/Transaction";
import Register from "./views/screens/Register/Register";
import Login from "./views/screens/Login/Login";
import Verify from "./views/screens/Verify/Verify";
import ResetPassword from "./views/screens/ResetPassword/ResetPassword";
import AdminKyc from "./views/screens/Admin/AdminKyc";
import AdminManager from "./views/screens/Admin/AdminManager";
import ManagerMutualFund from "./views/screens/Manager/ManagerMutualFund";
import ManagerMutualFundPackage from "./views/screens/Manager/ManagerMutualFundPackage";
import ManagerTransaction from "./views/screens/Manager/ManagerTransaction";
import Payment from "./views/screens/Payment/Payment";
import ManagerBankAccount from "./views/screens/Manager/ManagerBankAccount";
import Package from "./views/screens/Package/Package";
import PackageDetail from "./views/screens/PackageDetail/PackageDetail";

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    document.title = "OctoFund - Platform Investasi Reksadana";
    let cookieResult = cookieObj.get("authData", { path: "/" });
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/product/:id" component={Detail} />
            <Route exact path="/package" component={Package} />
            <Route exact path="/package/:id" component={PackageDetail} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/transaction" component={Transaction} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/payment/:id" component={Payment} />
            <Route exact path="/verify/:token" component={Verify} />
            <Route exact path="/reset/:token" component={ResetPassword} />

            <Route
              exact
              path="/manager/mutualfund"
              component={ManagerMutualFund}
            />
            <Route
              exact
              path="/manager/package"
              component={ManagerMutualFundPackage}
            />
            <Route
              exact
              path="/manager/transaction"
              component={ManagerTransaction}
            />
            <Route
              exact
              path="/manager/bankaccount"
              component={ManagerBankAccount}
            />

            <Route exact path="/staff/manage/member" component={AdminKyc} />
            <Route
              exact
              path="/staff/manage/manager"
              component={AdminManager}
            />
          </Switch>
          {/* <Footer /> */}
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
