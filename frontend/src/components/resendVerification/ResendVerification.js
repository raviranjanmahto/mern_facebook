import { useState } from "react";
import "./ResendVerification.css";
import axios from "axios";

const ResendVerification = ({ user }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const sendVerificationLink = async () => {
    try {
      setError("");
      setSuccess("");
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resendVerification`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className='send_verification'>
      <span>
        Your account is not verified, verify your account before it get deleted
        after a few month from creating.
      </span>
      <a
      onClick={() => {
          sendVerificationLink();
        }}
      >
        click here to send verification link
      </a>
      {success && <div className='success_text'>{success}</div>}
      {error && <div className='error_text'>{error}</div>}
    </div>
  );
};

export default ResendVerification;
