import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ImageUploader from "./components/ImageUpload/ImageUpload";
import PuzzleBoard from "./components/PuzzleBoard/PuzzleBoard";

function App() {
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
