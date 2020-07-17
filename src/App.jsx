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
import MemberProfile from "./views/screens/Member/MemberProfile";
import MemberPortfolio from "./views/screens/Member/MemberPortfolio";
import MemberTransaction from "./views/screens/Member/MemberTransaction";
import MemberBankAccount from "./views/screens/Member/MemberBankAccount";
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
import AdminReport from "./views/screens/Admin/AdminReport";
import NotFound from "./views/screens/Error/NotFound";
import ManagerProfile from "./views/screens/Manager/ManagerProfile";
import AdminProfile from "./views/screens/Admin/AdminProfile";
import AdminBank from "./views/screens/Admin/AdminBank";

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

  renderRoleRoutes = () => {
    if (this.props.user.role.id == 1) {
      return (
        <>
          <Route exact path="/admin" component={AdminProfile} />
          <Route exact path="/admin/member" component={AdminKyc} />
          <Route exact path="/admin/manager" component={AdminManager} />
          <Route exact path="/admin/bank" component={AdminBank} />
          <Route exact path="/admin/report" component={AdminReport} />
        </>
      );
    } else if (this.props.user.role.id == 2) {
      return (
        <>
          <Route exact path="/manager" component={ManagerProfile} />
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
        </>
      );
    } else if (this.props.user.role.id == 3) {
      return (
        <>
          <Route exact path="/member" component={MemberProfile} />
          <Route exact path="/member/portfolio" component={MemberPortfolio} />
          <Route
            exact
            path="/member/transaction"
            component={MemberTransaction}
          />
          <Route
            exact
            path="/member/bankaccount"
            component={MemberBankAccount}
          />
        </>
      );
    } else {
      return (
        <>
          <Route path="*" component={NotFound} />
        </>
      );
    }
  };

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
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/payment/:id" component={Payment} />
            <Route exact path="/verify/:token" component={Verify} />
            <Route exact path="/reset/:token" component={ResetPassword} />
            {this.renderRoleRoutes()}
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
