import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Menu from "./components/Menu";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Menu />
    <div className="container">
      <App />
    </div>
  </BrowserRouter>
);
