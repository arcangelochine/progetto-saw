import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Guest,
  Home,
  Inventory,
  Login,
  NotFound,
  Register,
  Stat,
  User,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Guest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/inventory/:id" element={<Inventory />} />
        <Route path="/inventory/:id/stats" element={<Stat />} />
      </Routes>
    </Router>
  );
}

export default App;
