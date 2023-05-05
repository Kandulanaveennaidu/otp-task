import { useState, useRef, useEffect } from "react";

const PhoneVerificationPopup = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) {
      return;
    }
    if (!Number(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      if (index === otp.length - 1) {
        inputRefs.current[index].blur();
        return;
      }
      setActiveInput(index + 1);
    } else {
      if (index === 0) {
        return;
      }
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text");
    const otpArray = pasteData.split("").filter((char) => !isNaN(char));
    if (otpArray.length !== otp.length) {
      return;
    }
    setOtp(otpArray);
    setActiveInput(otpArray.length - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeInput === 0) {
        return;
      }
      setActiveInput(activeInput - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (activeInput === otp.length - 1) {
        return;
      }
      setActiveInput(activeInput + 1);
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[activeInput - 1] = "";
      setOtp(newOtp);
      setActiveInput(Math.max(activeInput - 1, 0));
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setOtp(Array(6).fill(""));
      setActiveInput(0);
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Phone Verification</h2>
        <p>Enter the OTP you received on 9705627977</p>
        <div className="otp-inputs-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className={index === activeInput ? "active" : ""}
              maxLength="1"
            />
          ))}
        </div>
        <div className="popup-buttons">
          <button className="cancel-button" onClick={onClose}>
            Change Number
          </button>
          <button className="submit-button">Re-send OTP</button>
          <button
            className="submit-button1"
            onClick={() => alert(otp.join(""))}
            disabled={otp.includes("")}
          >
            Verify Phone Number
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PhoneVerificationPopup;
