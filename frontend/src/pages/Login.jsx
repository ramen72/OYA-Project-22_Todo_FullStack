import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);
  console.log(loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <>
      <h1 className={`font-bold text-2xl text-center mb-6 mt-20`}>Login</h1>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className={`w-1/2 p-10 mt-10 mx-auto bg-gray-200 rounded`}
      >
        <div>
          <label
            htmlFor="email"
            className={`inline-block w-1/4 font-bold text-xl text-right capitalize`}
          >
            email :
          </label>
          <input
            className={`border ml-5 p-2 my-1 w-3/5`}
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email here..."
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className={`inline-block w-1/4 font-bold text-xl text-right capitalize`}
          >
            password :
          </label>
          <input
            className={`border ml-5 p-2 my-1 w-3/5`}
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter your password here..."
          />
        </div>
        <div className={`flex justify-end items-center mt-3`}>
          <button
            type="submit"
            className={`bg-blue-500 px-5 py-3 text-white font-bold text-lg capitalize rounded-lg mr-20 cursor-pointer hover:bg-blue-600`}
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
