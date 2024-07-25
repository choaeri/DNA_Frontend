import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './component/Home';
import Login from './component/Header/login/Login';
import SignUp from './component/Header/signup/Signup';
import Recommend from './component/Recommend/Recommend';
import ListView from './component/View/ListView/ListView';
import MapView from './component/View/MapView/MapView';
import LoginCheck from './component/Header/loginCheck/LoginCheck';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users/login/check" element={<LoginCheck />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/listview" element={<ListView />} />
          <Route path="/mapview" element={<MapView />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
