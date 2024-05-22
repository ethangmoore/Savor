import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Savor from "../../assets/images/Savor.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    // SignUp API Call

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-primary to-secondary min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-center py-20 space-y-10 lg:space-y-0 lg:space-x-10 lg:px-20">
          {/* Image */}
          <div className="flex flex-col items-center lg:pl-10 justify-center lg:w-3/4">
            <img
              src={Savor}
              alt="Savor"
              className="w-1/2 pr-14 lg:items-center lg:w-full pb-10"
            />
            <p className="text-white text-center font-bold text-4xl lg:text-6xl pb-10">
              Food brings us together
            </p>
            <p className="text-white text-center text-2xl lg:text-4xl">
              Join today
            </p>
          </div>
          {/* Signup Form */}
          <div className="flex items-center justify-center lg:w-1/2 lg:pt-40">
            <div className="w-full max-w-md border rounded bg-white px-7 py-10">
              <form onSubmit={handleSignUp}>
                <h4 className="text-2xl mb-7">Sign Up</h4>

                <input
                  type="text"
                  placeholder="Name"
                  className="input-box"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Email"
                  className="input-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                <button type="submit" className="btn-primary">
                  Create Account
                </button>

                <p className="text-sm text-center mt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="front-medium text-primary underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;