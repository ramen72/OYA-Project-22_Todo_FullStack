import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registration } from "./../features/auth/authSlice";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(registration(formData));
  };

  return (
    <>
      <h1 className={`font-bold text-2xl text-center mb-6`}>Registration</h1>
      <form
        action="POST"
        onSubmit={handleSubmit}
        className={`w-1/2 p-10 mt-10 mx-auto bg-gray-200 rounded`}
      >
        <div>
          <label
            htmlFor="username"
            className={`inline-block w-1/4 font-bold text-xl text-right capitalize`}
          >
            user name :
          </label>
          <input
            className={`border ml-5 p-2 my-1 w-3/5`}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Enter your userName here..."
          />
        </div>
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
        <div>
          <label
            htmlFor="confirmPassword"
            className={`inline-block w-1/4 font-bold text-xl text-right capitalize`}
          >
            Confirm Password :
          </label>
          <input
            className={`border ml-5 p-2 my-1 w-3/5`}
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
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

export default Registration;
