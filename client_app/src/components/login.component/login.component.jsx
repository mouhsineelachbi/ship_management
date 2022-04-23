import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../feature/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);

  const login = (e: SyntheticEvent) => {
    e.preventDefault();
    const user = {
      Username: username,
      Password: password,
    };
    dispatch(loginUser(user))
      .unwrap()
      .then(
        () => {
          navigate("/")
        },
        (e) => {
          toast.current.show({severity: 'error', summary: 'Login error', detail: 'Invalide credentials'});
        }
      );
  };

  return (
    <div className="col-12 d-flex h-50">
      <main className="form-signup">
        <form onSubmit={login}>
          <div className="form-title text-center">
            <h1 className="h3 mb-4 fw-normal">Login</h1>
          </div>
          <Toast ref={toast} />
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
