import './App.css';
// import Navbar from './coomponent/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from './coomponent/Home';
// import About from './coomponent/About';
import NoteState from './context/notes/NoteState';
import Home from './component/Home';
import About from './component/About';
import Navbar from './component/Navbar';
import Alert from './component/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>

          <Navbar />
          <Alert message="thia is allert" />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/about" element={<About />} />

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
