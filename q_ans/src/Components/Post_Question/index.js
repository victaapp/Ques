import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import axios from "axios";
import { Base_url } from "../../Config";
import { Alert } from "react-bootstrap";
const TextEditor = () => {
  const [des, setDes] = useState("");
  const [title, setTitle] = useState("");
  const Login_token = localStorage.getItem("Login_token");
  const HandleChange = (e) => {
    setDes(e);
  };
  const removeTags = (html) => {
    const tempDivElement = document.createElement("ReactQuill");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  };
  const handleAskQuestion = () => {
    const plainTextContent = removeTags(des);
    console.log(plainTextContent);
    const data = {
      title: title,
      description: plainTextContent,
    };
    if(plainTextContent ==='' && title ===''){
      document.getElementById("showerr").style.display="block";
    }
    axios
      .post(`${Base_url}/api/all-questions/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Login_token}`,
        },
      })
      .then((res) => {
        // window.location.href = "/All_Questions";
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          <form>
            <div className="mt-5 form-group">
              <p className="text-start h6">Title</p>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Be specific and imagine you’re asking a question to another person."
              />
            </div>
          </form>
        </div>
        <div className="col-8 mt-5">
          <ReactQuill
            value={des}
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
