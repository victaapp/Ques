import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/index";
import moment from "moment";
import "./index.css";
import TextTruncateToggle from "../Truncate";
const AllQuestions = () => {
  const volunteer = localStorage.getItem("volunteer");
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [isTruncated, setIsTruncated] = useState(true);

  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    axios
      .get(`${Base_url}/api/all-questions/`)
      .then((res) => {
        // debugger;
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
  const PostQuestion = () => {};
  return (
    <>
      <Navbar />
      <div className="container">
        <div></div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            {volunteer === "true" ? (
              <div className="container">
                <div className="row">
                  <div className="col-12 d-flex justify-content-between mt-4">
                    <h1 className="text-start text-info">All Questions</h1>
                    <button className="btn btn-success" onClick={PostQuestion}>
                      Post Question
                    </button>
                  </div>
                  <div className="col-12">
                    <ol className="text-start">
                      {currentItems.map((ques) => (
                        <>
                          <br />
                          <li className="text-light">
                            <div>
                              <p className="text-info">{ques.title}</p>

                              <TextTruncateToggle
                                text={ques.description}
                                truncateLength={300}
                              />

                              <div className="text-dark">
                                Ask By
                                <i className="text-danger">
                                  {" "}
                                  {ques.ask_byy.username}{" "}
                                </i>
                                on{" "}
                                <span className="text-dark">
                                  {" "}
                                  {moment(ques.ask_byy.date_joined).format(
                                    "YYYY-MM-DD"
                                  )}
                                </span>
                                {/*<a href="#"> {ques.created}</a>
                            <a href="#">last_Modified{ques.last_modified}</a>*/}
                              </div>
                            </div>
                          </li>
                        </>
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
        </div>
      </div>
    </>
  );
};

export default AllQuestions;
