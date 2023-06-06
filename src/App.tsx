import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Admin,
  Analytics,
  Home,
  Inventory,
  Landing,
  Login,
  NotFound,
//Offline,
  Register,
  User,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/inventory/:id" element={<Inventory />} />
        <Route path="/inventory/:id/stats" element={<Analytics />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
