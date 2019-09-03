import React, { useState } from "react";
import Modal from "react-modal";

import APIRequests from "../../requests/api.requests";

function Login({ setToken }) {
  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");

  async function submitLogin(event) {
    setLoading(true);
    if (event) event.preventDefault();

    try {
      const token = await APIRequests().login(email, password);
      setToken(token);
    } catch (error) {
      setError(error.message);
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
        placeholder="Email"
        onChange={event => setEmail(event.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={event => setPassword(event.target.value)}
        onKeyDown={event => {
          if (event.key === "Enter") {
            submitLogin();
          }
        }}
      />

      {loading ? (
        <button disabled>Waiting server...</button>
      ) : (
        <button onClick={event => submitLogin(event)}>Login</button>
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
          <p>{error}</p>
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

export default Login;
