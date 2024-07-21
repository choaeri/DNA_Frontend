import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './component/Home';
import Login from './component/Header/login/Login';
import SignUp from './component/Header/signup/Signup';
import Recommend from './component/Recommend/Recommend';
import ListView from './component/View/ListView/ListView';
import MapView from './component/View/MapView/MapView';
import AuthCheck from './component/Header/authCeck/AuthCheck';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth/check" element={<AuthCheck />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/listview" element={<ListView />} />
          <Route path="/mapview" element={<MapView />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
