import React, { useState } from "react";

const AuthForm = ({ submit,errors }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container p-4">
      <div className="bg-light rounded p-4">
        <form
          className="w-100 h-100 row justify-content-center align-items-center"
          onSubmit={(e) => {
            e.preventDefault()
            submit({
              email,
              password,
            });
          }}
        >
          <div className="form-group row mb-4">
            <label className="col-md-2">Email</label>
            <div className="col-md-4">
              <input
                type="email"
                className=" form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mb-4">
            <label className="col-md-2">Password</label>
            <div className="col-md-4">
              <input
                type="password"
                className=" form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            {
              errors?.map((error)=>{
               return <div key={error} className="text-danger">{error}</div>
              })
            }
            <button className="btn btn-success" type="submit" role="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
