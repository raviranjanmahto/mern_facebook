import PropagateLoader from "react-spinners/PropagateLoader";

const ActivateForm = ({ type, text, header, loading }) => {
  return (
    <div className='blur'>
      <div className='popup'>
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className='popup_message'>{text}</div>
        <PropagateLoader color='#1f76f2' size={30} loading={loading} />
      </div>
    </div>
  );
};

export default ActivateForm;
