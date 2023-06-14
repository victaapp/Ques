import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert } from "react-bootstrap";
import "./index.css";
import Navbar from "../Navbar";
import TextTruncateToggle from "../Truncate/index";
import { Link ,Navigate, useNavigate} from "react-router-dom";
export default function Ques_Answer() {
  const [question, setQuestion] = useState(null);
  const [ans, setAns] = useState(null);
  const [giveAns, setGiveAns] = useState(null);
  const [userinfo, setUserInfo] = useState("");
  const QID = Number(localStorage.getItem("QID"));
  const Login_token = localStorage.getItem("Login_token");
  const User = localStorage.getItem("user");
  localStorage.setItem("Edit", false);
  const Navigate = useNavigate();
  // debugger
  // console.log(User)
  // const history = useHistory();
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
        console.log(res.data);
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
          window.location.href = "/Ques_Answer";
        })
        .catch((err) => {});
    }
  };
  const handlePost = () => {
    // localStorage.removeItem("QID");
    localStorage.setItem("ThroughPost", true);
    if (Login_token !== null) {
      // window.location.href = "/Post_Question";
      // localStorage.setItem("ThroughPost", true);
    } else {
      window.location.href = "/signin";
    }
  };
  const handleEdit = () => {
    // window.location.href = "/Post_Question";
    // history.push("/Post_Question");
    localStorage.setItem("Edit", true);
  };

  if (question === null) {
    return <div>Loading...</div>;
  }

  const Back =()=>{
    Navigate(-1);
  }
  return (
    <div className="container-fluied">
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-2 mt-4">
            <button className="btn btn-outline-success px-3" onClick={Back}> Back</button>
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

                      <TextTruncateToggle
                        text={question.description}
                        truncateLength={280}
                      />
                      <div className="text-dark mt-3 text-end">
                        <span className="me-2">Ask By</span>
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
                    <li key={ans.id} className="mt-5">
                      {ans.description}
                    </li>
                  ))
                : "Answers are not available"}
            </ol>
          </div>
        </div>
        <hr className="w-75 mx-auto" />

        <div className="row">
          {Login_token !== null ? (
            <div className="col-8 mx-auto">
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
