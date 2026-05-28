import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />

      <Route
        path="/posts/:id"
        element={<ViewPost />}
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;