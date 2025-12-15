import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

const containerStyle: React.CSSProperties = {
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  backgroundColor: "white",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "5px",
  textAlign: "left",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const buttonBaseStyle: React.CSSProperties = {
  padding: "10px 20px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const loginButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  backgroundColor: "#4CAF50",
};

const logoutButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  backgroundColor: "#f44336",
};

const errorTextStyle: React.CSSProperties = {
  color: "red",
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (error) toast.error(error.toString);
  }, [error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please try again.";
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/user-disabled":
          errorMessage = "This user account has been disabled.";
          break;
        default:
          break;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error("Logout error:", err);
      setError("Failed to log out.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>{currentUser ? "Welcome Back!" : "Login to Your Account"}</h2>

      {currentUser ? (
        <div>
          <p>
            Logged in as: <strong>{currentUser.email}</strong>
          </p>
          <p>UID: {currentUser.uid}</p>

          <button onClick={handleLogout} disabled={loading} style={logoutButtonStyle}>
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={formStyle}>
          {error && <p style={errorTextStyle}>{error}</p>}

          <div>
            <label htmlFor="email" style={labelStyle}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" disabled={loading} style={loginButtonStyle}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
