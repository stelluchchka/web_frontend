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
      <Route path="/" element={<Navigate to="/web_frontend" replace />}  />
        <Route path="/web_frontend" element={<MainPage />} />
        <Route path="/dishes" element={<Navigate to="/web_frontend" replace />} />
        <Route path="/dishes/:id" element={<DetailedPage />} />
      </Routes>
    </>
  );
}

export default App;