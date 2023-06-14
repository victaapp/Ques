import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import ReactPaginate from "react-paginate";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/index";
import moment from "moment";
import "./index.css";
import TextTruncateToggle from "../Truncate";
// import { useHistory } from 'react-router-dom';
const AllQuestions = () => {
  // localStorage.removeItem("QID");
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  let arr = [2,6,5,9,6,3,9]
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const volunteer = localStorage.getItem("volunteer");
  const Login_token = localStorage.getItem("Login_token");
  const OnlyUser = localStorage.getItem("OnlyUser");
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
    // const target =
    //   event.target.parentElement.parentElement.parentElement.parentElement
    //     .parentElement.parentElement.parentElement.firstChild.children[0]
    //     .lastElementChild.lastElementChild.innerText;

    if (Login_token === null && volunteer === "true") {
      // window.location.href = "/signin";
      localStorage.setItem("ThroughPost", true);
      localStorage.removeItem("Edit");
    } else if (Login_token === null && volunteer === "false") {
      // window.location.href = "/Signup";
      // localStorage.setItem("ThroughPost", true);
      // localStorage.removeItem("Edit");
    } else {
      // window.location.href = "/Post_Question";
      localStorage.removeItem("Edit");
    }
  };

  useEffect(()=>{
    for (let i = 0; i < currentItems.length; i++) {
             
    }
  },[])

  const GoToAnswer = (ques) => {
    localStorage.setItem("QID", ques.id);
    // window.location.href = `/Ques_Answer/`;
  };
  const Back = () => {
    navigate(-1);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-around mt-5">
          <div className="col-10 d-flex justify-content-between">
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
          <div className="col-10 mx-auto mt-4">
            <h1 className="text-start text-info">All Questions</h1>
            <ol className="text-start">
              {
                currentItems.map((ques) => (
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
                          className="text-info h5"
                          style={{ cursor: "pointer" }}
                          onClick={() => GoToAnswer(ques)}
                        >
                          {ques.title}
                        </p>
                      </Link>

                      <TextTruncateToggle
                        text={ques.description}
                        truncateLength={280}
                      />
                      <div className="text-dark mt-2 text-end">
                        <span className="me-2">Ask By</span>
                        <i className="text-danger mx-1">
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
