import { useState } from "react";
import PhoneVerificationPopup from "./components/PhoneVerificationPopup";
import "./index.css";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="app-container">
      <h1>Phone Verification</h1>
      <button onClick={handlePopupOpen}>Verify Phone Number</button>
      <PhoneVerificationPopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default App;
