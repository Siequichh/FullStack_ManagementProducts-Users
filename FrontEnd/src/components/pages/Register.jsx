import React, { useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import Modal from "../common/Modal";

const Register = () => {
  const [username,setUsername]=useState("")
  const [email,setEmail]= useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  const navigate = useNavigate();


  const handleRegister = async(e)=>{
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Invalid email format");
      return;
    }
  
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    
      const res = await UserService.registerUser(email,username,password);
      if(res.error){
        setError(res.error);
        return;
      }
      navigate("/login");
    
  }
  return (
    <>
      <div
        className="mt-8 max-w-sm mx-auto bg-white shadow  py-5 px-6"
        bis_skin_checked="1"
      >
        <form onSubmit={handleRegister}>
          <h1>Hello, Register here !</h1>
          <div className="mt-6" bis_skin_checked="1">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700"
            >
              User Name
            </label>
            <div className="mt-1" bis_skin_checked="1">
              <input
                type="text"
                name="username"
                id="username"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
            </div>
          </div>
          <div className="mt-6" bis_skin_checked="1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <div className="mt-1" bis_skin_checked="1">
              <input
                type="email"
                name="email"
                id="email"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="mt-6" bis_skin_checked="1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="mt-1" bis_skin_checked="1">
              <input
                type="password"
                name="password"
                id="password"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className="m-2 text-blue-500 text-xs italic underline">
              {" "}
              <Link to="/login">
                {" "}
                You already have an account? Please Login here
              </Link>
            </span>
          </div>
          <div className="mt-4 text-right" bis_skin_checked="1">
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      {error && (<Modal error={error} onClick={()=>setError(null)}/>)}
    </>
  );
};

export default Register;
