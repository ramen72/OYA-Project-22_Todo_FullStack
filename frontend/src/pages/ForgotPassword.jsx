import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forgot } from "./../features/auth/authSlice";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgot(formData));
  };

  return (
    <>
      <h1 className={`font-bold text-2xl text-center mb-6 mt-20`}>
        Forgot Password
      </h1>
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

export default ForgotPassword;
