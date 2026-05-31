import React from "react";
import * as colors from "../app/standard-colors";

const Table = ({ title, columns, data }) => {
  // Translate the column string names to clean capitalized headers
  const headers = columns.map(name => name.charAt(0).toUpperCase() + name.slice(1));

  return (
    <div style={{ width: "100%", margin: "24px 0", overflowX: "auto" }}>
      {title && <h2 style={{ color: colors.pink || "#fd5660", marginBottom: "12px" }}>{title}</h2>}
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${colors.pink || "#fd5660"}` }}>
            {headers.map((head, index) => (
              <th key={index} style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ display: "block", maxHeight: "50vh", overflowY: "auto", width: "100%" }}>
          {data.map((row, rowIndex) => {
            // Checks if chosen answer (index 2) matches correct answer (index 3)
            const isCorrect = row[2] === row[3];
            const backgroundColor = isCorrect ? "#e0ffd9" : "#ffe6e6"; // Light green vs Light red

            return (
              <tr key={rowIndex} style={{ display: "table", tableLayout: "fixed", width: "100%", backgroundColor, borderBottom: "1px solid #ddd" }}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ padding: "12px", textAlign: "left", wordBreak: "break-word" }}>
                    {String(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;