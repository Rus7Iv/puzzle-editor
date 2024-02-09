import { useRef, useEffect, MouseEvent } from "react";
import "./PuzzleBoard.styles.css";

interface Selected {
  index: number;
  element: EventTarget | null;
}

const PuzzleBoard = () => {
  const selected = useRef<Selected | null>(null);

  const places = [
    { color: "yellow", position: [300, 100] },
    { color: "orange", position: [300, 200] },
    { color: "red", position: [100, 100] },
    { color: "green", position: [200, 100] },
    { color: "blue", position: [100, 200] },
    { color: "purple", position: [200, 200] }
  ].map((place) => ({ ...place, radius: Math.random() * 100 }));

  const pieces = places.map((piece) => ({
    color: piece.color,
    position: [Math.random() * 300, Math.random() * 300 + 300],
    radius: piece.radius
  }));

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>, index: number) => {
    selected.current = { index, element: event.target };
  }

  const handleMouseMove = (event: globalThis.MouseEvent) => {
    if (selected.current) {
      const { element, index } = selected.current;
      const positionX = event.pageX - (element as HTMLDivElement).offsetWidth / 2;
      const positionY = event.pageY - 96;
      const targetX = places[index].position[0];
      const targetY = places[index].position[1];
      const differenceX = Math.abs(positionX - targetX);
      const differenceY = Math.abs(positionY - targetY);
  
      if (differenceX < 16 && differenceY < 16) {
        const transition = `transform 100ms linear`;
        const transform = `translate3d(${targetX - (element as HTMLDivElement).offsetWidth / 4}px, ${
          targetY - (element as HTMLDivElement).offsetHeight / 4
        }px, 0)`;
  
        (element as HTMLDivElement).style.transform = transform;
        (element as HTMLDivElement).style.transition = transition;
        (element as HTMLDivElement).style.opacity = "0.5";
        endDrag();
      } else {
        const transform = `translate3d(${positionX}px, ${positionY}px, 0)`;
  
        (element as HTMLDivElement).style.transform = transform;
      }
    }
  }

  const handleMouseUp = () => {
    endDrag();
  }

  const endDrag = () => {
    selected.current = null;
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  });

  return (
    <div className="puzzle-board">
      {places.map((piece, index) => (
        <div
          key={index}
          style={{
            backgroundColor: piece.color,
            borderRadius: piece.radius + "%",
            width: "32px",
            height: "32px",
            position: "absolute",
            transform: `translate3d(${piece.position[0]}px, ${piece.position[1]}px, 0)`
          }}
        >
          {index}
        </div>
      ))}

      {pieces.map((piece, index) => (
        <div
          key={index}
          onMouseDown={(event) => handleMouseDown(event, index)}
          style={{
            backgroundColor: piece.color,
            borderRadius: piece.radius + "%",
            width: "64px",
            height: "64px",
            position: "absolute",
            transform: `translate3d(${piece.position[0]}px, ${piece.position[1]}px, 0)`
          }}
        >
          {index}
        </div>
      ))}
    </div>
  );
}

export default PuzzleBoard;
