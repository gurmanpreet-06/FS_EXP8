import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [msg, setMsg] = useState("");

  // 🔐 LOGIN
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMsg("Login Successful ✅");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login Failed ❌");
    }
  };

  // 👤 USER ROUTE
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setMsg("User Access: " + res.data.message + " ✅");
    } catch (err) {
      setMsg(err.response?.data?.message || "Access Denied ❌");
    }
  };

  // 👑 ADMIN ROUTE
  const getAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setMsg("Admin Access: " + res.data.message + " ✅");
    } catch (err) {
      setMsg(err.response?.data?.message || "Forbidden ❌");
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMsg("Logged out");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Authentication System</h1>

      {!token ? (
        <>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h2>Dashboard ✅</h2>

          <button onClick={getUser}>User Route</button>
          <br /><br />

          <button onClick={getAdmin}>Admin Route</button>
          <br /><br />

          <button onClick={logout}>Logout</button>
        </>
      )}

      <h3>{msg}</h3>
    </div>
  );
}

export default App;