import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import ResumeBuilder from "./components/ResumeBuilder";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<ResumeBuilder />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
