// table.js

import React, { useState } from 'react';
import './table.css';

const Table = ({ data = null, columns = null, pageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({});
  const getCaps = (str) => {
    if (str) return str.toUpperCase();
  };

  const handleFilterChange = (field, value) => {
    setFilter({
      ...filter,
      [field]: value,
    });
    setCurrentPage(1); // Reset to the first page when a filter changes
  };

  const filteredData = data
    ? data.filter((row) =>
        Object.entries(filter).every(([field, value]) =>
          String(row[field]).toLowerCase().includes(value.toLowerCase())
        )
      )
    : [];

  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const paginatedData =
    filteredData.length > 0
      ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="filters">
        {columns &&
          columns.map((column) => (
            <div key={column.field}><center>
              <label htmlFor={column.field}>{column.header}</label></center>
              <input
                type="text"
                id={column.field}
                value={filter[column.field] || ''}
                onChange={(e) => handleFilterChange(column.field, e.target.value)}
              />
            </div>
          ))}
      </div>

      <table>
        <thead>
          <tr>
            {columns &&
              columns.map((head) => (
                <th key={head.field}>{getCaps(head.header, head.field)}</th>
              ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalRows === 0 && <p>No matching data found.</p>}

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
