import { useMemo } from "react";
import { generateBlobs } from "./utils";

export default function PulsatingBackground() {
  const blobs = useMemo(() => generateBlobs(), []);

  return (
    <>
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className="blob"
          style={{
            background: blob.background,
            top: blob.top,
            left: blob.left,
            animationDuration: blob.animationDuration,
            animationDelay: blob.animationDelay,
            overflow: "visible",
          }}
        />
      ))}
    </>
  );
}
