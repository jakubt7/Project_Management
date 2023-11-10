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
