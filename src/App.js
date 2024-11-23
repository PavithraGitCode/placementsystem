import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate pagination variables
  const totalPosts = data.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Handle page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app">
      <h1>React JS Pagination Design</h1>
      <ul>
        {currentData.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>

       {/* Pagination Controls */}
       <div className="pagination">
        <button
          className="arrow"
          id="prevPage"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          ← <span className="nav-text">PREV</span>
        </button>
        <div className="pages">
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index + 1}
              className={`page-number ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <button
          className="arrow"
          id="nextPage"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          <span className="nav-text">NEXT</span> →
        </button>
      </div>
    </div>
  );
}

export default App;
