import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Classes from "./component/Classes";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllStudents from "./component/Classes/AllStudents";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<AllStudents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
