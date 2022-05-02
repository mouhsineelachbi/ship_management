import { BiError } from "react-icons/bi";
import { useSelector } from "react-redux";

const ErrorPage = () => {
  const { errorMessage } = useSelector((state) => state.ships);
  return (
    <div className="row h-100 w-100 d-flex align-content-center ">
      <div className="col-12 col-sm-12 col-md-12 d-flex justify-content-center text-danger">
        <BiError size={200} />
      </div>
      <div className="col-12 col-sm-12 col-md-12 d-flex justify-content-center"><h1 className="text-danger">{ errorMessage }</h1></div>
      <div className="col-12 col-sm-12 col-md-12 d-flex justify-content-center text-danger"><h5>Please Try Again</h5></div>
      
    </div>
  );
};

export default ErrorPage;
