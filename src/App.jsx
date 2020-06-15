//libraries
import React from "react";
import { Route, Switch } from "react-router-dom";

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

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/portfolio" component={Portfolio} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
