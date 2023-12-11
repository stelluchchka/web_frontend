import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import MainPage from "./pages/main";
import DetailedPage from "./pages/detailed";
import RegistrationPage from "./pages/registration/registration";
import LoginPage from "./pages/login/login";
import Dishes from "./pages/dishes";

console.log("1")
function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/dishes" replace />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/dishes/:id" element={<DetailedPage />} />
        <Route path='/registration' element={<RegistrationPage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </>
  );
}

export default App;