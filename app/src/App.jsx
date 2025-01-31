import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/userContext'; 
import { MainLayout } from './MainLayout/MainLayout';
import { HomePage } from './Pages/HomePage/HomePage';
import { NewsPage } from './Pages/NewsPage/NewsPage';
import { LoginPage } from './Pages/LoginPage/LoginPage'; 
import { Dashboard } from './Pages/Dashboard/Dashboard'; 
import { ReservationPage } from "./Pages/Reservation/ReservationPage"; 


function App() {
  return (
    <UserContextProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
