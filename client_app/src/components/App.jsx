import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getAllShips } from "../feature/ship/ship.slice";
import "./App.css";
import Home from "./home.component/home.component";
import Login from "./login.component/login.component";
import Navbar from "./navbar.component/navbar.component";
import Signup from "./signup.component/signup.component";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShips());
  }, []);

  const { isLoading, errorMessage, ships } = useSelector(
    (state) => state.ships
  );

  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
