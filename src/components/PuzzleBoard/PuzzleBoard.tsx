import { useRef, useEffect, MouseEvent } from "react";
import img11 from '../../assets/images/11.jpg';
import img12 from '../../assets/images/12.jpg';
import img13 from '../../assets/images/13.jpg';
import img21 from '../../assets/images/21.jpg';
import img22 from '../../assets/images/22.jpg';
import img23 from '../../assets/images/23.jpg';
import img31 from '../../assets/images/31.jpg';
import img32 from '../../assets/images/32.jpg';
import img33 from '../../assets/images/33.jpg';
import "./PuzzleBoard.styles.css";
import Circle from "../../assets/Circle";

interface Selected {
  index: number;
  element: EventTarget | null;
}

const PuzzleBoard = () => {
  const selected = useRef<Selected | null>(null);

  const imagePieces = [img11, img12, img13, img21, img22, img23, img31, img32, img33];

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
