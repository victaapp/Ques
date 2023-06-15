import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import ReactPaginate from "react-paginate";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/index";
import moment from "moment";
import "./index.css";
import TextTruncateToggle from "../Truncate";

const AllQuestions = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 10;
  const volunteer = localStorage.getItem("volunteer");
  const Login_token = localStorage.getItem("Login_token");
  const OnlyUser = localStorage.getItem("OnlyUser");
  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  localStorage.removeItem("signin");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    axios
      .get(`${Base_url}/api/all-questions/`)
      .then((res) => {
        setAllQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const loadedItems = allQuestions.slice(startIndex, endIndex);
    setCurrentItems(loadedItems);
  }, [allQuestions, currentPage]);

  const handlePost = (event) => {
    if (Login_token === null && volunteer === "true") {
      localStorage.setItem("ThroughPost", true);
      localStorage.removeItem("Edit");
    } else if (Login_token === null && volunteer === "false") {
    } else {
      localStorage.removeItem("Edit");
    }
  };
  const getAnswerCount = async (questionId) => {
    try {
      const response = await axios.get(
        `${Base_url}/api/all-questions/${questionId}/answers/`
      );
      const answerCount = response.data.length;
      return answerCount;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const updatedItems = await Promise.all(
        currentItems.map(async (ques) => {
          const answerCount = await getAnswerCount(ques.id);
          return { ...ques, answerCount: answerCount };
        })
      );
      setCurrentItems(updatedItems);
    };
    fetchData();
  }, [currentItems]);
  const GoToAnswer = (ques) => {
    localStorage.setItem("QID", ques.id);
  };
  const Back = () => {
    navigate(-1);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-around mt-5">
          <div className="col-8 d-flex justify-content-between">
            <button className="btn btn-outline-success px-4" onClick={Back}>
              Back
            </button>
            <Link
              to={
                Login_token === null &&
                volunteer === "true" &&
                OnlyUser === "false"
                  ? "/signin"
                  : Login_token === null &&
                    volunteer === "false" &&
                    OnlyUser === "false"
                  ? "/signin"
                  : OnlyUser === "true" && volunteer === "false"
                  ? "/Signup"
                  : user === "true" && Login_token === "true"
                  ? "/signin"
                  : "/Post_Question"
              }
            >
              <button
                className="btn btn-outline-success postquestion btn-lg"
                onClick={handlePost}
              >
                Post Question
              </button>
            </Link>
          </div>
        </div>
        <div className="row ms-auto">
          <div className="col-8 mx-auto mt-4">
            <h3 className="text-start text-info">
              All Question{" "}
              <span className="text-secondary">
                {currentItems.length < 10
                  ? `0${currentItems.length}`
                  : currentItems.length}
              </span>
            </h3>
            <ol className="text-start">
              {currentItems.map((ques) => (
                <React.Fragment key={ques.id}>
                  <br />
                  <br />
                  <li className="text-dark">
                    <div>
                      <Link
                        to="/Ques_Answer/"
                        style={{ textDecoration: "none" }}
                      >
                        <p
                          id="ques_title"
                          className="text-info h5"
                          onClick={() => GoToAnswer(ques)}
                        >
                          {ques.title}
                        </p>
                      </Link>
                      <TextTruncateToggle
                        text={ques.description}
                        truncateLength={280}
                      />
                      <div className="text-dark mt-2 d-flex justify-content-between">
                        <div>
                          <span
                            className="me-2"
                            style={{
                              background: "gray",
                              color: "white",
                              padding: "0px 5px 2px 5px",
                              borderRadius: "4px",
                            }}
                          >
                            Answers : {ques.answerCount}
                          </span>
                        </div>
                        <div>
                          <span className="me-2 Ask_By">Ask By</span>
                          <i className="text-danger mx-1 ">
                            {ques.ask_byy.username}
                          </i>
                          <span className="mx-1">on</span>
                          <span className="text-dark h6">
                            {moment(ques.ask_byy.date_joined).format(
                              "YYYY-MM-DD"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </React.Fragment>
              ))}
            </ol>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(allQuestions.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllQuestions;
