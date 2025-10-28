import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import FormView from "./components/FormView";
import ListView from "./components/ListView";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/form" replace />} />
        <Route path="/form" element={<FormView />} />
        <Route path="/list" element={<ListView />} />
      </Routes>
    </Router>
  );
}

export default App;
