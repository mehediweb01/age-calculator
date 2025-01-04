import { useState } from "react";

function App() {
  const [input, setInput] = useState<string>("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) {
      alert("Invalid date");
      return;
    }
    const birthDate = new Date(input);
    const today = new Date();

    if (today < birthDate) {
      alert("Invalid date");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days });
  };
  return (
    <>
      <div className="bg-zinc-950 min-h-screen flex justify-center items-center">
        <div className="shadow-xl shadow-white h-full sm:w-1/2 w-full mx-6 px-6 py-4 text-center rounded-xl">
          <div className="border-b border-slate-300 my-2 rounded-full">
            <h1 className="text-green-600 font-serif font-bold tracking-widest text-3xl my-3">
              Age Calculator
            </h1>
          </div>
          <div className="my-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="date"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-3/4 px-4 py-3 rounded-md focus:ring-2 focus:outline-none focus:ring-sky-400 text-xl font-semibold text-sky-400"
              />
              <br />
              <button
                type="submit"
                className="bg-sky-400 px-6 py-3 text-white font-serif font-semibold hover:bg-sky-600 hover:text-black transition-colors duration-300 rounded-md"
              >
                Calculate Age
              </button>
            </form>
          </div>
          {/* showing result */}
          <div className="mt-3 shadow-sm shadow-sky-400">
            <p className="font-semibold text-xl text-white space-x-4">
              <span>{age?.years} years </span>
              <span>{age?.months} Months</span>
              <span>{age?.days} Days</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
