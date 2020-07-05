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

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
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
            <Route exact path="/detail" component={Detail} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/transaction" component={Transaction} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
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
