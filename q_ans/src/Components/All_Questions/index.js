import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./index.css";
const AllQuestions = () => {
  const volunteer = localStorage.getItem("volunteer");
  const signin = localStorage.getItem("signin");
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

const HandleSignOut = ()=>{
  localStorage.removeItem("signin");
}

  return (
    <>
      {signin === "true" ? (
        <div className="d-flex justify-content-end">
          <Link to="/signin" style={{ color: "#fff3cd" }} onClick={HandleSignOut}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <Link to="/signin" style={{ color: "#fff3cd" }}>
            Signin
          </Link>
        </div>
      )}

      {volunteer === "true" ? (
        <div>
        <h1 className="text-start">Questions list</h1>
          <ol className="text-start">
            {currentItems.map((ques) => (
              <>
                <br />
                <li className="text-light"> {ques.description}</li>
              </>
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
      ) : (
        ""
      )}
    </>
  );
};

export default AllQuestions;
