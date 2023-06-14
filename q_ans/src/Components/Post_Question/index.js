import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import axios from "axios";
import { Base_url } from "../../Config";
import { Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
const TextEditor = () => {
  const [des, setDes] = useState("");
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDes, setEditData] = useState("");
  const Login_token = localStorage.getItem("Login_token");
  const QID = localStorage.getItem("QID");
  const isEdit = localStorage.getItem("Edit");
  const Navigate=useNavigate();
  const HandleChange = (e) => {
    isEdit === "true" ? setEditData(e) : setDes(e);
  };
  const removeTags = (html) => {
    const tempDivElement = document.createElement("ReactQuill");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  };
  const handleAskQuestion = () => {
    const plainTextContent = removeTags(isEdit === "true" ? editDes : des);
    console.log(plainTextContent);
    const data = {
      title: isEdit === "true" ? editTitle : title,
      description: plainTextContent,
    };
    if (plainTextContent === "" && title === "") {
      document.getElementById("showerr").style.display = "block";
    }
    axios
      .post(`${Base_url}/api/all-questions/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Login_token}`,
        },
      })
      .then((res) => {
        alert(isEdit==="true" ?"Question Updated Successfully":"Question Posted Successfully");
        window.location.href = "/All_Questions";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (isEdit === "true") {
      axios
        .get(`${Base_url}/api/all-questions/${QID}/`)
        .then((res) => {
          setEditData(res.data.description);
          setEditTitle(res.data.title);
        })
        .catch((err) => {});
    }
  }, []);

  const Back = ()=>{
    Navigate(-1);
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
        <button className="btn btn-outline-success px-5 mt-5 d-flex" onClick={Back}>Back</button>

          <form>
            <div className="mt-5 form-group">
              <p className="text-start h6">Title</p>
              <input
                type="text"
                className="form-control"
                value={isEdit === "true" ? editTitle : title}
                onChange={(e) =>
                  isEdit === "true"
                    ? setEditTitle(e.target.value)
                    : setTitle(e.target.value)
                }
                placeholder="Be specific and imagine you’re asking a question to another person."
              />
            </div>
          </form>
        </div>
        <div className="col-8 mt-5">
          <ReactQuill
            value={isEdit === "true" ? editDes : des}
            onChange={HandleChange}
            placeholder="Start typing your question..."
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
          <Alert className="mt-3" key="danger" variant="danger" id="showerr">
            Please fill the all details
          </Alert>
          <button
            className="btn btn-outline-secondary mt-4"
            onClick={handleAskQuestion}
          >
            Ask Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
