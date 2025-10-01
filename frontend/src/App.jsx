import { Toaster } from 'sonner';
import axios from 'axios';
import { Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
