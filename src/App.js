import { useState, useEffect } from "react";

const myCurrency = ["USD", "SEK", "JPY"];

function App() {
  const [data, setData] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  async function fetchData() {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    setData(() => data.rates);
  }
  const output = data[from] * amount * data[to] || 0;
  console.log(output);

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e) {
    if (e.target.id === "from") {
      setFrom(() => e.target.value);
    }
    if (e.target.id === "to") {
      setTo(() => e.target.value);
    }
  }

  function handleAmount(e) {
    setAmount(() => e.target.value);
  }
  return (
    <div className="App h-screen flex items-center justify-center">
      <div className="border-2 bg-[#4287f5] w-[200px] h-[200px] text-center">
        currency exchange
        <div className="">
          <input
            value={amount}
            onChange={handleAmount}
            className="text-center m-2"
            placeholder={"enter amount"}
          />
        </div>
        <select id={"from"} className="m-2" onChange={handleChange}>
          <option>From</option>
          {myCurrency.map((x) => {
            return (
              <option key={x} value={x}>
                {x}
              </option>
            );
          })}
          {/* {Object.keys(data).map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })} */}
        </select>
        <select id={"to"} onChange={handleChange}>
          <option>To</option>
          {/* {Object.keys(data).map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })} */}
          {myCurrency.map((x) => {
            return (
              <option key={x} value={x}>
                {x}
              </option>
            );
          })}
        </select>
        <div className="mt-4 text-5xl">{output.toFixed(2)}</div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
