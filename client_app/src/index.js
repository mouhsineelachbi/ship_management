import React from "react";
import "./index.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./feature/store";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
