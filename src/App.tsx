import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Analytics,
  AnalyticsTable,
  Home,
  Inventory,
  InventoryTable,
  Landing,
  Login,
  Logout,
  //Offline,
  Pro,
  Register,
  User,
} from "./pages";
import { AuthRoute, PrivateRoute } from "./components/utils";
import { AuthProvider } from "./core";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<Landing />} />

          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/:id"
            element={
              <PrivateRoute>
                <InventoryTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics/:id"
            element={
              <PrivateRoute>
                <AnalyticsTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/pro"
            element={
              <PrivateRoute>
                <Pro />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PrivateRoute redirect="/">
                <Logout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
