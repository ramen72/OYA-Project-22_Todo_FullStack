import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "./NavComponent";

const CommonLayout = () => {
  return (
    <>
      <div className={`overflow-x-hidden`}>
        <NavComponent />
        <Outlet />
        {/* <h1>Footer</h1> */}
      </div>
    </>
  );
};

export default CommonLayout;
