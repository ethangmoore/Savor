import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Savor from "../../assets/images/Savor.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API Call
    try {
      // const response = await axiosInstance.post("/login", {
      //   email: email,
      //   password: password,
      // });

      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      // Handle succcessful login response
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
              Welcome back
            </p>
          </div>
          {/* Login Form */}
          <div className="flex items-center justify-center lg:w-1/2 lg:pt-40">
            <div className="w-full max-w-md border rounded bg-white px-7 py-10">
              <form onSubmit={handleLogin}>
                <h4 className="text-2xl mb-7">Login</h4>

                <input
                  type="text"
                  placeholder="Email"
                  className="input-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                <button type="submit" className="btn-primary">
                  Login
                </button>

                <p className="text-sm text-center mt-4">
                  Not registered yet?{" "}
                  <Link
                    to="/signUp"
                    className="front-medium text-primary underline"
                  >
                    Create an Account
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

export default Login;