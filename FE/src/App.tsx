import { Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-thread/:id" element={<Box>Not Found</Box>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;