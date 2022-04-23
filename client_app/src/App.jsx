import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ErrorPage from "./components/error.component/error.component";
import Loading from "./components/loading.component/loading.component";
import Navbar from "./components/navbar.component/navbar.component";
import Signup from "./components/signup.component/signup.component";
import { getAllShips } from "./feature/ship/ship.slice";
import Login from "./components/login.component/login.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home.component/home.component";
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
            <Route path="/register" element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
      </main>

      {/* {isLoading && <Loading />}
      {ships && <ShipItems />}
      { errorMessage && <ErrorPage />} */}
    </div>
  );
}

export default App;
