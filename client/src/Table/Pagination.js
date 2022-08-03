import React, { useState, useEffect } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
  const numberOfButtons= Math.ceil(total / showPerPage)
  

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="pagination-container">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              
              onClick={() => onButtonClick("prev")}
            >
              ⬅️
            </button>
          </li>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li className={`page-item ${index + 1 === counter ? "active" : null}`}>
              <button
                className="page-link"
                
                onClick={() => setCounter(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              class="page-link"
              
              onClick={() => onButtonClick("next")}
            >
              ➡️
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
