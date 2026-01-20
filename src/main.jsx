import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/login";
import App from "./App";

function Main() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <Login onAuth={() => setAuthenticated(true)} />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
