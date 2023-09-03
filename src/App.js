import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Machine from "./components/Machine/Machine";
import Admin from "./components/Admin/Admin";
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Machine />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="*" element={<Machine />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
