import { faBowlRice, faBurger, faMugHot } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import type { CardProps } from "./Card";
import Card from "./Card";
import { Divider } from "./Divider";
import PulsatingBackground from "./PulsatingBackground";

function App() {
  const items: CardProps[] = [
    { title: "Craveables", icon: faBurger, counter: 5 },
    { title: "Osmows", icon: faBowlRice, counter: 1 },
    { title: "Hot Chocolate", icon: faMugHot, counter: 10 },
  ];

  return (
    <>
      <PulsatingBackground />

      <div style={{ marginBottom: "80px", maxWidth: "1280px", margin: "auto" }}>
        <h1>Carrot's Craveable Counter</h1>
        <Divider />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {items.map((item) => (
            <Card {...item} />
          ))}
        </div>
        <Divider />
      </div>
    </>
  );
}

export default App;
