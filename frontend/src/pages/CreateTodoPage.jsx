import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreateTodoPage = () => {
  const [todo, setTodo] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Call Data using api
    // api.get("/todo/getall-todos").then((data) => {
    //   console.log(data);
    // });

    // Call Data using Axios
    axios
      .get("http://localhost:3000/api/todo/getall-todos", {
        headers: {
          Authorization: `bearer ${
            localStorage.getItem("userInfo").accessToken
          }`,
        },
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  const handleCreate = () => {
    axios
      .post(
        "http://localhost:3000/api/todo/createTodo",
        {
          text: todo,
        },
        {
          headers: {
            Authorization: `bearer ${
              localStorage.getItem("userInfo").accessToken
            }`,
          },
        }
      )
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <div className={`w-[585px] mx-auto mt-4 p-10 rounded-2xl bg-gray-50`}>
        <h1 className={`font-bold text-2xl text-center mb-10`}>
          {JSON.parse(localStorage.getItem("userInfo"))?.username} Welcome to
          Create Todo
        </h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="Write todo here."
          onChange={(e) => setTodo(e.target.value)}
          className={`w-[400px] border mr-5 p-2`}
        />
        <button
          onClick={handleCreate}
          className={`bg-gray-200 px-4 py-2 rounded-lg font-bold capitalize cursor-pointer hover:bg-gray-300 transition-all duration-300`}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTodoPage;
