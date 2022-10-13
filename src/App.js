import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({});

  async function fetchData() {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    setData(() => data.rates);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
  }
  return (
    <div className="App h-screen flex items-center justify-center">
      <div className="border-2 border-black w-[200px] h-[200px] text-center">
        currency exchange
        <div className="">
          <input className="text-center" placeholder={"enter amount"} />
        </div>
        <select onChange={handleChange}>
          {Object.keys(data).map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
        <select onChange={handleChange}>
          <option>To</option>
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>
        <div className="">output</div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
