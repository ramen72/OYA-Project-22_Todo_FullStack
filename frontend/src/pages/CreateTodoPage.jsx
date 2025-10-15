import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateTodoPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/todo/getall-todos").then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <>
      <div className={`w-[585px] mx-auto mt-4 p-10 rounded-2xl bg-gray-50`}>
        <h1 className={`font-bold text-2xl text-center mb-10`}>Create Todo</h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="Write todo here."
          className={`w-[400px] border mr-5 p-2`}
        />
        <button
          className={`bg-gray-200 px-4 py-2 rounded-lg font-bold capitalize cursor-pointer hover:bg-gray-300 transition-all duration-300`}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTodoPage;
