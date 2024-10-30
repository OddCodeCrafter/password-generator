import { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";

    if (isNumber) str += "1234567890";
    if (isCharacter) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isCharacter, isNumber]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isCharacter, isNumber, passwordGenerator]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-gray-600 text-white text-center my-10 mx-16 rounded-xl shadow-lg w-2/5 justify-center items-center">
        <h1 className="text-5xl my-7"> Password Generator </h1>
        <div className="flex  gap-y-5">
          <input
            className="text-gray-700 border-none rounded-l-md h-12 w-96 px-2 text-xl font-semibold"
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setLength(e.target.value);
            }}
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-900 rounded-r-md px-4 text-lg font-bold"
          >
            Copy
          </button>
        </div>
        <div className="flex my-7 justify-center items-center">
          <input
            className="cursor-pointer mr-2"
            type="range"
            name="range"
            min={4}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="range" className="text-xl">
            Length: {length}
          </label>
          <span className="mx-4 items-center">
            <input
              className="mr-1 w-4 h-4"
              type="checkbox"
              name="number"
              value={isNumber}
              onChange={() => {
                setIsNumber((prev) => !prev);
              }}
            />
            <label htmlFor="number" className="text-xl">
              Number
            </label>
          </span>
          <span className="mx-4 items-center">
            <input
              className="mr-1 w-4 h-4"
              type="checkbox"
              name="character"
              value={isCharacter}
              onChange={() => {
                setIsCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="number" className="text-xl">
              Character
            </label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
