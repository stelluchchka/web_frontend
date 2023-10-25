import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import MainPage from "./pages/main";
import DetailedPage from "./pages/detailed";
// import Breadcrumps from "./components/breadcrumps/breadcrumps";

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Breadcrumps /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/dishes" replace />} />
        <Route path="/dishes" element={<MainPage />} />
        {/* <Route path="/dishes" element={<DetailedPage />} /> */}
        <Route path="/dishes/:id" element={<DetailedPage />} />
      </Routes>
    </>
  );
}

export default App;