import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './layout/DashboardLayout';
import RegisterationLayout from './layout/RegisterationLayout';
import CreateCard from './pages/CreateCard';
import EditCard from './pages/EditCard';
import Home from './pages/Home';
import Login from './pages/Login';
import MyCards from './pages/MyCards';
import MyFavorites from './pages/MyFavorites';
import Signup from './pages/Signup';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <Route path='*' element={<DashboardLayout />}>
            <Route path='home' element={<Home />} />
            <Route path='my-favorites' element={<MyFavorites />} />
            <Route path='my-cards' element={<MyCards />} />
            <Route path='my-cards/create' element={<CreateCard />} />
            <Route path='my-cards/:id' element={<EditCard />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
          </Route>
        ) : (
          <Route path='*' element={<RegisterationLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
