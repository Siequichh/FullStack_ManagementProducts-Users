import React from 'react'

const Button = ({ onClick, children, type = "button", variant = "primary" }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-semibold focus:outline-none";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 rounded-lg p-1",
      danger: "bg-red-600 text-white hover:bg-red-700 rounded-lg p-1",
      success: "bg-green-600 text-white hover:bg-green-700 rounded-lg p-1",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  