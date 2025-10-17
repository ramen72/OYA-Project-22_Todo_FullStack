import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreateTodoPage = () => {
  const [todo, setTodo] = useState("");
  const [file, setFile] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, [navigate]);

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
            JSON.parse(localStorage.getItem("userInfo")).accessToken
          }`,
          // "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        setTodoList(data.data.todos);
        console.log(data.data.todos);
      });
  }, []);

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("text", todo);
    formData.append("todoImage", file);

    axios
      .post(
        "http://localhost:3000/api/todo/createTodo",
        formData,
        // {
        //   text: todo,
        //   todoImage: file,
        // },
        {
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("userInfo")).accessToken
            }`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data) => {
        setSuccessMessage(data.data.message);
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
        console.log(data);
      });
    setTodo("");
    // setFile({});
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
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
          value={todo}
          name=""
          id=""
          placeholder="Write todo here."
          onChange={(e) => setTodo(e.target.value)}
          className={`w-[400px] border mr-5 p-2`}
        />
        <input
          type="file"
          name=""
          id=""
          onChange={handleFile}
          // value={file}
          className={`block border my-2 p-2`}
        />
        <button
          onClick={handleCreate}
          className={`bg-gray-200 px-4 py-2 rounded-lg font-bold capitalize cursor-pointer hover:bg-gray-300 transition-all duration-300`}
        >
          Create
        </button>
        {successMessage && <h4>{successMessage}</h4>}
        <div>
          {todoList.map((item, index) => (
            <div className={`my-10 border roundeds mx-auto`}>
              <img
                src={item.mediaUrl}
                alt=""
                className={`mx-auto w-full h-auto`}
              />
              <h2
                key={index}
                className={`text-2xl text-center mt-2 capitalize`}
              >
                {item.text}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateTodoPage;
