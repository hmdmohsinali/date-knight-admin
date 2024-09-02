import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dashboard from "../assests/dashboard.png"; // Ensure the path to your image is correct
import { serverUrl } from "../../config";
import { toast } from "react-toastify";
import { Loader } from "../Loader/loader";


const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true)
      const response = await axios.post(`${serverUrl}user/api/addUser`, {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setLoading(false)
      if (response.data.status) {
        toast.success("Sign up Successfully")
        navigate("/login");
      } else {
        setError(response.data.message);
        setLoading(false)
      }
      
    } catch (err) {
      setLoading(false)
      console.error("Error signing up:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="area">
        <ul className="circles">
          {[...Array(10)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-6">
            <img src={dashboard} className="w-16 h-16 mx-auto" alt="Logo" />
            <h1 className="text-3xl font-extrabold text-gray-900">Sign Up</h1>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                UserName
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create an account
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-500 underline"
              >
                Log in
              </Link>
              .
            </p>

            <p className="mt-6 text-xs text-gray-600 text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
      <Loader loading={loading}/>
    </>
  );
};

export default SignUp;
