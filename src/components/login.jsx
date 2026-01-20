import { useState } from "react";
import '../css/Login.css';


export default function Login({ onAuth }) {

  const users = [
    {
      username: "numpang",
      password: import.meta.env.VITE_NUMPANG_PASSWORD,
      label: "Log in as Numpang"
    },
    {
      username: "midori",
      password: import.meta.env.VITE_MIDORI_PASSWORD,
      label: "Log in as Midori"
    }
  ];
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserSelect = (username) => {
    setSelectedUser(username);
    setPassword("");
    setError("");
  };

  const handlePasswordSubmit = () => {
    const user = users.find(u => u.username === selectedUser);
    
    if (user && user.password === password) {
      localStorage.setItem("user", selectedUser);
      onAuth();
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setPassword("");
    setError("");
  };

  if (selectedUser) {
    const user = users.find(u => u.username === selectedUser);
    return (
      <div style={styles.box} className="styles-box">
        <h2>Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
          placeholder="Enter password"
          autoFocus
        />
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        <button
          onClick={handlePasswordSubmit}
          style={styles.button}
        >
          Login
        </button>
        <button
          onClick={handleCancel}
          style={{...styles.button, marginTop: "8px", background: "#9CA3AF"}}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div style={styles.box} className="styles-box">
      <h2>Select Account</h2>

      {users.map((user) => (
        <button
          key={user.username}
          onClick={() => handleUserSelect(user.username)}
          style={styles.button}
        >
          {user.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  box: {
    maxWidth: 320,
    margin: "120px auto",
    padding: 24,
    textAlign: "center"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    fontSize: "16px",
    cursor: "pointer"
  }
};
