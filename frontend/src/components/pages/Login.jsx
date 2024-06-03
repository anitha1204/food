
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    Useremail: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const {data} = await axios.post("http://localhost:2000/register",{
        ...values,
      });
      
    } catch (error) {
       console.log(err);
    }
    // toast.success("Form submitted!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 duration-200 w-[350px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
            <p className="text-center text-blue-500 text-lg font-medium">
              Login Account
            </p>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="Useremail"
                placeholder="Enter email"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Submit
            </button>
            <span className="block text-center">
              Already have an account?
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
