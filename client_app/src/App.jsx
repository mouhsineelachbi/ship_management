import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ErrorPage from "./components/error.page/error.page";
import Loading from "./components/loading.page/loading.screen";
import ShipItems from "./components/ship.items/ship.items";
import { getAllShips } from "./feature/ship/ship.slice";

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
      {isLoading && <Loading />}
      {ships && <ShipItems />}
      { errorMessage && <ErrorPage />}
    </div>
  );
}

export default App;
