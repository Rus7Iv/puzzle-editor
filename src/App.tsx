import { useState, useEffect } from 'react';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ImageUploader from "./components/ImageUpload/ImageUpload";
import PuzzleBoard from "./components/PuzzleBoard/PuzzleBoard";

function App() {
  const [isImageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    const checkImageUpload = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!localStorage.getItem(`image_part_${i}_${j}`)) {
            return false;
          }
        }
      }
      return true;
    };

    setImageUploaded(checkImageUpload());
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <div className='main'>
          <ImageUploader />
          <PuzzleBoard />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
