import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert } from "react-bootstrap";
import "./index.css";
import Navbar from "../Navbar";
// import TextTruncateToggle from "../Truncate/index";
import { Link, useNavigate } from "react-router-dom";
export default function Ques_Answer() {
  const [question, setQuestion] = useState(null);
  const [ans, setAns] = useState(null);
  const [giveAns, setGiveAns] = useState(null);
  const [userinfo, setUserInfo] = useState("");
  const QID = Number(localStorage.getItem("QID"));
  const Login_token = localStorage.getItem("Login_token");
  const User = localStorage.getItem("user");
  // const scrollToEditor = localStorage.getItem("scrollToEditor");
  const navigate = useNavigate();
  localStorage.setItem("Edit", false);
 
  useEffect(() => {
    axios
      .get(`${Base_url}/api/all-questions/${QID}/`)
      .then((res) => {
        setUserInfo(res.data.ask_byy.username);
        setQuestion(res.data);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${Base_url}/api/all-questions/${QID}/answers/`)
      .then((res) => {
        setAns(res.data);
      })
      .catch((err) => {});
  }, []);
  const HandleChange = (e) => {
    setGiveAns(e);
  };
  const removeTags = (html) => {
    const tempDivElement = document.createElement("ReactQuill");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  };
  const handleGiveAnswer = () => {
    const plainTextContent = removeTags(giveAns);
    if (plainTextContent === "") {
      document.getElementById("showerr").style.display = "block";
    } else {
      document.getElementById("showerr").style.display = "none";
      const data = {
        question: QID,
        description: plainTextContent,
      };
      axios
        .post(`${Base_url}/api/answer/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Login_token}`,
          },
        })
        .then((res) => {
          alert("Answer Posted Successfully");
          navigate("/All_Questions");
        })
        .catch((err) => {});
    }
  };
  const handlePost = () => {
    localStorage.setItem("ThroughPost", true);
    if (Login_token !== null) {
    } else {
      navigate("/signin");
    }
  };

  const handleEdit = () => {
    localStorage.setItem("Edit", true);
  };

  const Back = () => {
    navigate(-1);
  };

  const scrollToAnswerEditor = () => {
    let ansEditor = document.getElementById("Ans_Editor");
    if (Login_token !== null) {
      ansEditor.scrollIntoView({ behavior: "smooth" });
    } else {
      // localStorage.setItem("Give_Ans",true);
      localStorage.setItem("scrollToEditor", true);
      navigate("/signin");
    }
  };
 // useEffect(()=>{
  //   // debugger
  //   const val =localStorage.getItem("scrollToEditor")
  //   if(val=="true"){
  //     debugger
  //     // let ansEditor = document.getElementById("Ans_Editor")
  //     //    ansEditor.scrollIntoView({ behavior: "smooth" });
  //   }
  // },[])

  if (question === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container-fluied">
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-2 mt-4">
            <button className="btn btn-outline-success px-3" onClick={Back}>
              Back
            </button>
          </div>
          <div className="col-8 d-flex mx-auto justify-content-end mt-4">
            {User === userinfo ? (
              <Link to="/Post_Question">
                <button
                  className="btn btn-outline-success postquestion btn-lg me-3"
                  onClick={handleEdit}
                >
                  Edit Question
                </button>
              </Link>
            ) : (
              ""
            )}
            <Link to={Login_token !== null ? "/Post_Question" : "/signin"}>
              <button
                className="btn btn-outline-success postquestion btn-lg"
                onClick={handlePost}
              >
                Post Question
              </button>
            </Link>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-8 mt-5 mx-auto">
            <ol className="text-start">
              {
                <React.Fragment key={question.id}>
                  <br />
                  <li className="text-dark">
                    <div>
                      <p className="text-info h5">{question.title}</p>
                      <p>{question.description}</p>

                      <div className="text-dark mt-3 d-flex justify-content-between">
                        <div>
                          <button
                            className="btn btn-secondary"
                            onClick={scrollToAnswerEditor}
                          >
                            Give Answer
                          </button>
                        </div>
                        <div>
                          <span className="me-2 Ans_By">Ask By</span>
                          <i className="text-danger mx-1">
                            {question.ask_byy.username}
                          </i>
                          <span className="mx-1">on</span>
                          <span className="text-dark h6">
                            {moment(question.ask_byy.date_joined).format(
                              "YYYY-MM-DD"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </React.Fragment>
              }
            </ol>
          </div>
        </div>
        <hr className="w-75 mx-auto" />
        <div className="row mt-3">
          <div className="col-8 mx-auto">
            {ans !== null ? (
              <h3 className="text-start">{ans.length} Answers</h3>
            ) : (
              " "
            )}
            <ol>
              {ans !== null
                ? ans.map((ans) => (
                    <li key={ans.id} className="mt-5 text-start">
                      {ans.description}
                      <div className="d-blok text-end">
                        <span className="me-2 Ans_By">Answer By</span>
                        <i className="text-danger mx-1">
                          {question.ask_byy.username}
                        </i>
                        <span className="mx-1">on</span>
                        <span className="text-dark h6">
                          {moment(question.ask_byy.date_joined).format(
                            "YYYY-MM-DD"
                          )}
                        </span>
                      </div>
                    </li>
                  ))
                : "Answers are not available"}
            </ol>
          </div>
        </div>
        <hr className="w-75 mx-auto" />

        <div className="row" id="Ans_Editor">
          {Login_token !== null ? (
            <div className="col-8 mx-auto mb-5">
              <p className="text-start my-4" style={{ fontSize: "22px" }}>
                Your Answers
              </p>
              <ReactQuill
                value={giveAns}
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
              <Alert
                className="mt-3"
                key="danger"
                variant="danger"
                id="showerr"
              >
                Please Write the description
              </Alert>
              <button
                className="btn btn-outline-secondary mt-4"
                onClick={handleGiveAnswer}
              >
                Give Your Answer
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
