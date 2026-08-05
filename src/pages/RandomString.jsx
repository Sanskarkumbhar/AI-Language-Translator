 import { useState, useEffect, useCallback } from "react";

function RandomString() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [randomString, setRandomString] = useState("");

  const generateString = useCallback(() => {
    let chars = "";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+[]{}<>?/";

    if (!chars) {
      setRandomString("Please select at least one option.");
      return;
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      result += chars[index];
    }

    setRandomString(result);
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    generateString();
  }, [generateString]);

  const copyString = () => {
    navigator.clipboard.writeText(randomString);
    alert("Copied Successfully!");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-blue-500 to-purple-600 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          🎲 Random String Generator
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Generate secure random strings instantly.
        </p>

        <div className="bg-gray-100 border rounded-xl p-4 break-all text-lg font-mono">
          {randomString}
        </div>

        <button
          onClick={copyString}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
        >
          📋 Copy
        </button>

        <div className="mt-8">

          <label className="font-semibold">
            Length: {length}
          </label>

          <input
            type="range"
            min="6"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full mt-2"
          />

        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <label>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />{" "}
            Uppercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />{" "}
            Lowercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />{" "}
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />{" "}
            Symbols
          </label>

        </div>

        <button
          onClick={generateString}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg"
        >
          🔄 Generate New String
        </button>

      </div>

    </div>
  );
}

export default RandomString;