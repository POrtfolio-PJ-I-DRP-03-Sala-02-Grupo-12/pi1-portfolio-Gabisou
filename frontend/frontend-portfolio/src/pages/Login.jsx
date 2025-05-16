import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, isLoggedIn } from "../auth";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(); // simulated
    navigate("/editor");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-gabisou-primary">
      <h1 className="text-2xl font-bold pt-5 flex justify-center text-white">
        🔐Login Page
      </h1>

      {!isLoggedIn() ? (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded px-4 py-2 w-64"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-4 py-2 w-64"
          />

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer w-64"
            onClick={handleLogin}
          >
            Simulate Login
          </button>
        </>
      ) : (
        <>
          <p className="text-green-700 font-semibold">👋 Hello, admin!</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer w-64"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
