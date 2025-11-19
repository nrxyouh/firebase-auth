// src/pages/Home.tsx

import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import passwordShow from "../assets/password-show.svg";
import passwordHide from "../assets/password-hide.svg";

import { app } from "../firebase";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  type Auth,
} from "firebase/auth";

import { firebaseErrors } from "./errors";
import "./Home.css";

interface HomeProps {
  user: unknown;
}

export const Home = ({ user }: HomeProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth: Auth = getAuth(app);

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleSignIn = async () => {
    if (!email || !password) return;

    setLoading(true);

    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;

    try {
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Firebase AUTH ERROR:", err);
      const error = err as FirebaseError;
      const message =
        firebaseErrors[error.code] || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) return;

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Firebase AUTH ERROR:", err);
      const error = err as FirebaseError;
      const message =
        firebaseErrors[error.code] || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSignUpActive) {
      void handleSignUp();
    } else {
      void handleSignIn();
    }
  };

  if (user) {
    return <Navigate to="/private" />;
  }

  return (
    <section className="home-container">
      <h2>Welcome</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <fieldset>
          <legend>{isSignUpActive ? "Sign Up" : "Sign In"}</legend>

          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
            </li>
          </ul>

          <ul>
            <li className="password-row">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <img
                    src={showPassword ? passwordHide : passwordShow}
                    alt="toggle password"
                  />
                </button>
              </div>
            </li>
          </ul>

          <ul>
            <li className="remember-row">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberChange}
                />
                Remember me
              </label>
            </li>
          </ul>

          <button
            type="submit"
            disabled={!email || !password || loading}
            className="submit-btn"
          >
            {loading ? "Loading..." : isSignUpActive ? "Sign Up" : "Sign In"}
          </button>
        </fieldset>

        <button
          type="button"
          onClick={handleMethodChange}
          className="switch-btn"
        >
          {isSignUpActive ? "Already have an account?" : "Create an account"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2500} />
    </section>
  );
};
