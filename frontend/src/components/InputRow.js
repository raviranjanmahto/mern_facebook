import React from "react";
import "./InputRow.css";

const InputRow = ({ placeholder, type, name,onChange }) => {
  return (
    <div className='input_wrap'>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputRow;
