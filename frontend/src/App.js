
import './App.css';
import Home from './screens/Home.js';
import MyOrders from './screens/MyOrders.js';

import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import React from "react";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Cartprovider } from './components/contextreducer.jsx';

function App() {
  return (
    <Cartprovider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/myorders" element={<MyOrders />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />

          </Routes>
        </div>
      </Router>
    </Cartprovider>

  );
}

export default App;
