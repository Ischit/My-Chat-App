import "./App.css";
import Login from "./Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Signup from "./Signup";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
