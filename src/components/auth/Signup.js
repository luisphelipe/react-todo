import React, { useState } from "react";
import Modal from "react-modal";

import APIRequests from "../../requests/api.requests";

function Signup({ setToken }) {
  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [passwordConfirmation, setPasswordConfirmation] = useState(""),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");

  async function submitSignup(event) {
    setLoading(true);
    event.preventDefault();

    try {
      const token = await APIRequests().signup(
        email,
        password,
        passwordConfirmation
      );

      if (token) setToken(token);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }

    setLoading(false);
  }

  const closeModal = () => {
    setError("");
  };

  return (
    <div className="form">
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        onChange={event => setEmail(event.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={event => setPassword(event.target.value)}
      />

      <input
        type="password"
        name="password_confirmation"
        placeholder="Password Confirmation"
        onChange={event => setPasswordConfirmation(event.target.value)}
      />

      {loading ? (
        <button disabled>Waiting server...</button>
      ) : (
        <button onClick={event => submitSignup(event)}>Signup</button>
      )}

      {error ? (
        <Modal
          id="modal"
          isOpen={error.length > 0}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <h1 id="modal-title">Error</h1>
          {error.split(",").map(message => {
            return <p>{message}</p>;
          })}
          <button id="modal-close-button" onClick={closeModal}>
            Ok!
          </button>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default Signup;
