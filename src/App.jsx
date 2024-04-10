import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");



  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
  }



  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*_+-=?/";
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);


  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Password Generator
        </h1>
        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-4 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Your generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
        <div className="mb-6">
          <label htmlFor="length" className="block mb-2 text-gray-700">
            Length:
          </label>
          <input
            id="length"
            type="range"
            min={5}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="w-full bg-gray-200 rounded-lg overflow-hidden appearance-none focus:outline-none"
          />
          <div className="flex justify-between text-gray-600">
            <span>5</span>
            <span>{length}</span>
            <span>20</span>
          </div>
        </div>
        <div className="mb-6">
          <input
            id="numAllowed"
            type="checkbox"
            checked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
            className="mr-2"
          />
          <label htmlFor="numAllowed" className="text-gray-700">
            Include Numbers
          </label>
        </div>
        <div className="mb-6">
          <input
            id="charAllowed"
            type="checkbox"
            checked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            className="mr-2"
          />
          <label htmlFor="charAllowed" className="text-gray-700">
            Include Special Characters
          </label>
        </div>

      </div>
    </div>
  );
}

export default App;
