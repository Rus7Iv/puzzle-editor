import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PuzzleBoard from "./components/PuzzleBoard/PuzzleBoard";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <PuzzleBoard />
      </div>
      <Footer />
    </>
  );
}

export default App;
