import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Shipment from "./Components/Shipment/Shipment";
import Login from "./Components/Login/Login";
import { createContext, useState } from "react";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
  <userContext.Provider value= {[loggedInUser, setLoggedInUser]}>
    <h1>email {loggedInUser.email}</h1>
    <Router>
    <Header></Header>
      <Switch>
        <Route path="/shop">
        <Shop></Shop>
        </Route>
        <Route path="/review">
          <Review></Review>
        </Route>
        <PrivateRoute path="/inventory">
          <Inventory></Inventory>
        </PrivateRoute>
        <PrivateRoute path="/shipment">
          <Shipment></Shipment>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/">
          <Shop></Shop>
        </Route>
        <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>
  </userContext.Provider>
  );
}

export default App;
