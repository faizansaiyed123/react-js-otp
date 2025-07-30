import { useEffect, useRef, useState } from "react";

function Otp() {
  const [inputs] = useState(new Array(4).fill(""));
  const [inputArr, setInputArr] = useState(inputs);
  const refs = useRef([]);


  function handleInput(event, index) {
    const val = event.target.value;

    if (!Number(val)) return;

    const copy = [...inputArr];
    copy[index] = val;
    setInputArr(copy);

    // Move focus to next input
    if (index < refs.current.length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  // Handle backspace (on key down)
  function handleKeyDown(event, index) {
    if (event.key === "Backspace") {
      const copy = [...inputArr];

      if (copy[index] === "") {
        if (index > 0) {
          refs.current[index - 1]?.focus();
          copy[index - 1] = "";
          setInputArr(copy);
        }
      } else {
        copy[index] = "";
        setInputArr(copy);
      }
    }
  }


  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  return (
    <div className="otp-container">
      <h1>OTP Fields</h1>

      <div className="otp-inputs">
        {inputs.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={inputArr[index]}
            onChange={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (refs.current[index] = el)}
          />
        ))}
      </div>

      <button className="otp-button">Verify Otp</button>
    </div>
  );
}

export default Otp;
