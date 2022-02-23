import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListComponent from "./components/ListComponents";
import { AxiosTest } from "./pages/AxiosTest";
import Axios from 'axios';
import NewsApiPage from "./pages/NewsApiPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<ListComponent />}></Route>
      </Routes>

      <Routes>
        <Route path="/axiosTest" element={<AxiosTest />}></Route>
      </Routes>

      <Routes>
        <Route path="/NewsApiPage" element={<NewsApiPage />}></Route>
      </Routes>

      <Routes>
        <Route path="/news" element={<NewsApiPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
