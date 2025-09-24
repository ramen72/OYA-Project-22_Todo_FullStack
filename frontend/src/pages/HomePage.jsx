import React from "react";

const HomePage = () => {
  return (
    <>
      <div
        className={`h-[calc(100vh-77px)] w-full flex justify-center items-center border`}
      >
        <h1 className={`font-semibold text-9xl`}>
          Welcome to{" "}
          <span className={`font-bold text-green-700`}> Todo Application</span>
        </h1>
      </div>
    </>
  );
};

export default HomePage;
