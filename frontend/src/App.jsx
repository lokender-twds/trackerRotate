import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateLink from "./pages/CreateLink";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateLink />} />
      </Routes>
    </>
  );
}
