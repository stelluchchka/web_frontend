import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
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
        <Route path="/web_frontend" element={<Navigate to="/dishes" replace />} />
        <Route path="/dishes" element={<MainPage />} />
        <Route path="/dishes/:id" element={<DetailedPage />} />
      </Routes>
    </>
  );
}

export default App;