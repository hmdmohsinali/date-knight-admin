import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import login from '../../assets/login.png';
import { Loader } from "../Loader/Loader";
import { toast } from "react-toastify";
import { serverUrl } from "../../../api";


export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); 

    try {
      const response = await axios.post(`${serverUrl}login`, {
        email,
        password,
      });

      const { token } = response.data; 
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate("/"); 

    } catch (error) {

      console.error("Error during login:", error.response?.data || error.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false); 
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row max-w-5xl w-full p-6">
          <div
            className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
            style={{ backgroundImage: `url(${login})` }}
          ></div>

          <div className="w-full md:w-1/2 p-8 md:p-16">
            <h2 className="text-3xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {loading ? <span>Loading...</span> : "Sign In"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
}
