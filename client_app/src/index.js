import "bootstrap/dist/css/bootstrap.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./feature/store";
import "./index.css";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
