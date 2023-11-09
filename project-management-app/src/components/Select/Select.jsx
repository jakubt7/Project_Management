import React, { useState, useEffect } from 'react';

function Select({ api, label, column, id}) {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

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
      >
        {data.map((item) => (
          <option key={item[id]} value={item[id]}>
            {item[column]} 
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
