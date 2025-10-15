import React from "react";
import { Link } from "react-router";

const NavComponent = () => {
  return (
    <>
      <div className={`bg-green-100`}>
        <ul
          className={`flex justify-center items-center capitalize font-semibold text-xl`}
        >
          <li>
            <Link
              to={"/"}
              className={`inline-block px-5 py-3 rounded transition-all duration-300 hover:bg-green-200`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/registration"}
              className={`inline-block px-5 py-3 rounded transition-all duration-300 hover:bg-green-200`}
            >
              Registration
            </Link>
          </li>
          <li>
            <Link
              to={"/login"}
              className={`inline-block px-5 py-3 rounded transition-all duration-300 hover:bg-green-200`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to={"/forgot-password"}
              className={`inline-block px-5 py-3 rounded transition-all duration-300 hover:bg-green-200`}
            >
              Forgot Password
            </Link>
          </li>
          <li>
            <Link
              to={"/reset-password/:token"}
              className={`inline-block px-5 py-3 rounded transition-all duration-300 hover:bg-green-200`}
            >
              Reset Password
            </Link>
          </li>
          <li>
            <Link
              to={"/create-todo"}
              className={`inline-block px-5 py-3 rounded transition-all duration-300 hover:bg-green-200`}
            >
              CreateTodo
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavComponent;
