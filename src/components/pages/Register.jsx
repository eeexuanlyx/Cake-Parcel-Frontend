import React, { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };

      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          className="form-control my-3"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          className="form-control my-3"
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          className="form-control my-3"
          onChange={handleChange}
        />
        <button className="btn btn-success btn-block" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
