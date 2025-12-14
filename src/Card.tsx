import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";

export interface CardProps {
  title: string;
  icon: IconProp;
  counter?: number;
}

export default function Card(props: CardProps) {
  const { title, icon, counter } = props;

  const buttonStyles = {
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.2s",
    height: "32px",
    width: "32px",
    borderRadius: "8px",
  };

  const removeButtonColor = "#e2e8f0";
  const addButtonColor = "#1e293b";

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const triggerBounce = () => {
      setBounce(true);
      setTimeout(() => setBounce(false), 600); // match animation duration
    };

    const scheduleNext = () => {
      const randomTime = Math.random() * 8000 + 1000; // 1000ms → 9000ms
      setTimeout(() => {
        triggerBounce();
        scheduleNext(); // schedule next bounce
      }, randomTime);
    };

    scheduleNext();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center",
        padding: "64px 32px",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <FontAwesomeIcon icon={icon} size="4x" className={bounce ? "bounce" : ""} />
      <h3 style={{ margin: "10px" }}>{title}</h3>
      {counter && (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button style={{ ...buttonStyles, backgroundColor: removeButtonColor }}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <h2>{counter}</h2>
          <button style={{ ...buttonStyles, backgroundColor: addButtonColor }}>
            <FontAwesomeIcon icon={faPlus} color="white" />
          </button>
        </div>
      )}
    </div>
  );
}
