import "./App.css";
import type { CardProps } from "./Card";
import Card from "./Card";
import osmows from "/osmows.png";
import craveable from "/craveable.png";
import hotchocolate from "/hotchocolate.png";
import popcorn from "/popcorn.png";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "./loginForm";
import { queryClient } from "./utils/queryClient";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [loggingIn, setLoggingIn] = useState(false);

  const handleClick = () => {
    setLoggingIn((prevState) => !prevState);
  };

  const items: CardProps[] = [
    { title: "Craveable", image: craveable },
    { title: "Osmows", image: osmows },
    { title: "Hot Chocolate", image: hotchocolate },
    { title: "Popcorn", image: popcorn },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" closeOnClick />
      <div style={{ marginBottom: "100px", maxWidth: "600px", margin: "0 auto 60px auto" }}>
        <div style={{ display: "flex", justifyContent: "right" }}>
          {loggingIn && <FontAwesomeIcon icon={faXmark} onClick={handleClick} size="2x" />}
          {!loggingIn && <FontAwesomeIcon icon={faBars} onClick={handleClick} size="2x" />}
        </div>

        {loggingIn && <LoginForm />}
        {!loggingIn && (
          <>
            <h1 style={{ textAlign: "center" }}>Carrot's Craveable Counter</h1>
            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {items.map((item) => (
                <Card {...item} key={item.title} />
              ))}
            </div>
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
