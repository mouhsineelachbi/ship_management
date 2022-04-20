import React from "react";
import "./signup.screen.css";

export default function Signup() {
  return (
    <div className="col-12 d-flex h-50">
      <main className="form-signup">
        <form>
          <div className="form-title text-center">
            <h1 className="h3 mb-4 fw-normal">Sign up</h1>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
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
