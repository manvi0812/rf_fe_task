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
        <Route path="/rf_fe_task/" element={<Navigate to="/rf_fe_task/form" replace />} />
        <Route path="/rf_fe_task/form" element={<FormView />} />
        <Route path="/rf_fe_task/list" element={<ListView />} />
      </Routes>
    </Router>
  );
}

export default App;
