import React, { useState, useEffect, forwardRef} from "react";

const Select = forwardRef(({ api, label, column, id }, ref ) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(`Error fetching data from ${api}:`, error);
      });
  }, [api]);

  return (
    <div>
      <label>{label}:</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        ref={ref}
        className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {data.map((item) => (
          <option key={item[id]} value={item[id]}>
            {item[column]}
          </option>
        ))}
      </select>
    </div>
  );
})

export default Select;
