import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import SearchPg from './pages/SearchPg';
import ReportPg from './pages/ReportPg';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route  path='/' element={<SearchPg/>}/>
        <Route  path='/report' element={<ReportPg/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
