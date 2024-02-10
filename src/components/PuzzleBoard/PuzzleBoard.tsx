import { useRef, useEffect, MouseEvent } from "react";
import "./PuzzleBoard.styles.css";
import Circle from "../../assets/Circle";

interface Selected {
  index: number;
  element: EventTarget | null;
}

const PuzzleBoard = () => {
  const selected = useRef<Selected | null>(null);

  const imagePieces = Array.from({ length: 9 }, (_, i) => localStorage.getItem(`image_part_${Math.floor(i / 3)}_${i % 3}`) || '');

  const places = imagePieces.map((piece, index) => ({
    image: piece,
    position: [128 * (index % 3) + 32, 64 * Math.floor(index / 3) + 16]
  }));

  const pieces = places.map((piece, index) => ({
    image: piece.image,
    position: [Math.random() * 300, Math.random() * 300 + 300]
  }));

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>, index: number) => {
    selected.current = { index, element: event.target };
  }

  const handleMouseMove = (event: globalThis.MouseEvent) => {
    if (selected.current) {
      const { element, index } = selected.current;
      const positionX = event.pageX - (element as HTMLDivElement).offsetWidth / 2 - 16;
      const positionY = event.pageY - 112;
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
        (element as HTMLDivElement).style.opacity = "1";
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
            backgroundSize: 'cover',
            width: "32px",
            height: "32px",
            position: "absolute",
            transform: `translate3d(${piece.position[0]+16}px, ${piece.position[1]}px, 0)`
          }}
        >
          <Circle/>
        </div>
      ))}
  
      {pieces.map((piece, index) => (
        <div
          key={index}
          onMouseDown={(event) => handleMouseDown(event, index)}
          style={{
            backgroundImage: `url(${piece.image})`,
            backgroundSize: 'cover',
            width: "128px",
            height: "64px",
            position: "absolute",
            opacity: 0.5,
            transform: `translate3d(${piece.position[0]}px, ${piece.position[1]}px, 0)`
          }}
        />
      ))}
    </div>
  );
}

export default PuzzleBoard;
