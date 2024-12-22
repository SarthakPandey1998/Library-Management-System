import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Book from "./components/Book";
import Library from "./components/Library";
import Student from "./components/Student";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/student' element={<Student />} />
        <Route path='/book' element={<Book />} />
        <Route path='/library' element={<Library />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
