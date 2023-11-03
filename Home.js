import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const isNameEntered = name.trim() !== "";

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (!isNameEntered) {
      toast.warn("Please enter your name.");
    } else {
      navigate("/quiz", { state: { name } });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-green-400">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl text-center text-gray-800 font-bold mb-4">Welcome to the Quiz</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Player Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Start Quiz
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
