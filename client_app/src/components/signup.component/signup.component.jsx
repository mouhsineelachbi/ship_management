import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Toast } from 'primereact/toast';
import { addUser } from "../../feature/auth/auth.slice";
import "./signup.component.css";
import { useRef } from "react";

export default function Signup() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef("null");

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    const user = {Username: username, Password: password}
    dispatch(addUser(user))
    .unwrap()
    .then(
      ()=>{},
      (e)=>{toast.current.show({severity: 'error', summary: 'Sign up error', detail: e.message});}
    )
  }

  return (
    <div className="col-12 d-flex h-50">
      <main className="form-signup">
        <form onSubmit={register}>
          <div className="form-title text-center">
            <h1 className="h3 mb-4 fw-normal">Sign up</h1>
          </div>
          <Toast ref={toast} />
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={ e => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
}
