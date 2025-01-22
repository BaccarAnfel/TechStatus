import React, { useState } from "react";
import PropTypes from "prop-types";

function DropdownMenu({ placeholder, optionsList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
      <button
        onClick={toggleDropdown}
        style={{
          color: "#adb5bd",
          lineHeight: "135%",
          fontFamily: "Roboto",
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ced4da",
          fontSize: "14px",
          fontWeight: "normal",
          backgroundImage: `url("https://icons.veryicon.com/png/o/miscellaneous/decon/dropdown-1.png")`,
          backgroundColor: "white",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "30px",
          textAlign: "left",
        }}
      >
        {selectedOption}
      </button>

      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            listStyle: "none",
            margin: 0,
            width: "100%",
            boxShadow: "#81e3f9",
            zIndex: 1,
            color: "#495057",
          }}
        >
          {optionsList.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                fontFamily: "Roboto",
                padding: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Add PropTypes
DropdownMenu.propTypes = {
  placeholder: PropTypes.string.isRequired,
  optionsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropdownMenu;
