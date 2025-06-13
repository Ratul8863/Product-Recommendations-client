import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [layoutCols, setLayoutCols] = useState(3);

  useEffect(() => {
    fetch('http://localhost:5000/queries')
      .then((res) => res.json())
      .then((data) => setQueries(data));
  }, []);

  // Filter based on productName
  const filteredQueries = queries.filter((query) =>
    query.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">All User Queries</h2>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Product Name..."
          className="input input-bordered w-full md:w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Layout toggle buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setLayoutCols(1)}
            className={`btn btn-sm ${layoutCols === 1 ? 'btn-primary' : 'btn-outline'}`}
          >
            1 Column
          </button>
          <button
            onClick={() => setLayoutCols(2)}
            className={`btn btn-sm ${layoutCols === 2 ? 'btn-primary' : 'btn-outline'}`}
          >
            2 Columns
          </button>
          <button
            onClick={() => setLayoutCols(3)}
            className={`btn btn-sm ${layoutCols === 3 ? 'btn-primary' : 'btn-outline'}`}
          >
            3 Columns
          </button>
        </div>
      </div>

      {/* Grid Display */}
      {filteredQueries.length === 0 ? (
        <p className="text-center text-gray-500">No queries matched.</p>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-${layoutCols}  gap-6 transition-all`}>
          {filteredQueries.map((query) => (
            <div
              key={query._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg p-4 transition"
            >
              <img
                src={query.productImage}
                alt={query.productName}
                className="rounded mb-3 w-full h-48 object-cover"
              />
              <h3 className="text-lg font-bold">{query.queryTitle}</h3>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Product:</span> {query.productName}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Brand:</span> {query.productBrand}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-blue-700 font-semibold">
                  💡 {query.recommendationCount || 0} Recommendations
                </span>
                <Link
                  to={`/query/${query._id}`}
                  className="btn btn-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Recommend
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Queries;
