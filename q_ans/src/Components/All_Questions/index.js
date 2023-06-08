import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import ReactPaginate from "react-paginate";
// import { Link } from "react-router-dom";
import Navbar from "../Navbar/index";
import moment from "moment";
import "./index.css";
import TextTruncateToggle from "../Truncate";
// import { useHistory } from 'react-router-dom';
const AllQuestions = () => {
  const volunteer = localStorage.getItem("volunteer");
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 10;

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
    const target =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.firstChild.children[0]
        .lastElementChild.lastElementChild.innerText;

    if (target === "Signin") {
      window.location.href = "/signin";
      localStorage.setItem("ThroughPost", true);
    } else {
      window.location.href = "/Post_Question";
    }
  };
  // let history = useHistory ();

  const GoToAnswer = (ques) => {
    //  history.push ('/Ques_Answer',{id:ques.id});
    localStorage.setItem("QID", ques.id);
    window.location.href = `/Ques_Answer/`;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            {volunteer === "true" ? (
              <div className="container">
                <div className="row">
                  <div className="col-12 d-flex justify-content-between mt-4">
                    <h1 className="text-start text-info">All Questions</h1>
                    <button
                      className="btn btn-outline-success postquestion btn-lg"
                      onClick={handlePost}
                    >
                      Post Question
                    </button>
                  </div>
                  <div className="col-12">
                    <ol className="text-start">
                      {currentItems.map((ques) => (
                        <React.Fragment key={ques.id}>
                          <br />
                          <li className="text-dark">
                            <div>
                              <p
                                className="text-info h5"
                                onClick={() => GoToAnswer(ques)}
                              >
                                {ques.title}
                              </p>

                              <TextTruncateToggle
                                text={ques.description}
                                truncateLength={280}
                              />
                              <div className="text-dark mt-3 text-end">
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
                  </div>
                </div>

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
            ) : (
              ""
            )}
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
};

export default AllQuestions;
