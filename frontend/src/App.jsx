import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const user = sessionStorage.getItem("user");
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<LandingPage openForm={true} formType="signin" />}
        />
        <Route
          path="/signup"
          element={<LandingPage openForm={true} formType="signup" />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
