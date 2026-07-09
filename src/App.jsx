import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyPlants from "./pages/MyPlants";
import AddPlant from "./pages/AddPlant";
import EditPlant from "./pages/EditPlant";
import PlantDetails from "./pages/PlantDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plants"
        element={
          <ProtectedRoute>
            <MyPlants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-plant"
        element={
          <ProtectedRoute>
            <AddPlant />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-plant/:id"
        element={
          <ProtectedRoute>
            <EditPlant />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plant/:id"
        element={
          <ProtectedRoute>
            <PlantDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;