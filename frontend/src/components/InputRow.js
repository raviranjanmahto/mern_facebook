// import React from "react";
import "../styles/icons/icons.css";
import "./InputRow.css";
import { ErrorMessage, useField } from "formik";

const InputRow = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='input_wrap'>
      {meta.touched && meta.error && !bottom && (
        <div className='input_error' style={{ transform: "translateY(4px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className='error_arrow_top'></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div className='input_error' style={{ transform: "translateY(1px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className='error_arrow_bottom'></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i className='error_icon' style={{ top: `${!bottom && "63%"}` }}></i>
      )}
    </div>
  );
};

export default InputRow;
