import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../Config";
import moment from "moment";
import TextTruncateToggle from "../Truncate/index";
export default function Ques_Answer() {
  const [question, setQuestion] = useState(null); 

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/all-questions/37/`)
      .then((res) => {
        debugger;
        setQuestion(res.data);
      })
      .catch((err) => {
        debugger;
      });
  }, []);

  if (question === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 mt-5">
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
        <div className="col-1"></div>
      </div>
    </div>
  );
}

