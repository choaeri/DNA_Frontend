import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './component/Home';
import Login from './component/Header/login/Login';
import SignUp from './component/Header/signup/Signup';
import Recommend from './component/Recommend/Recommend';
import LoginCheck from './component/Header/loginCheck/LoginCheck';
import DetailLocation from './component/DetailLocation/DetailLocation';
import Account from './component/Header/Account/Account';

function App() {

  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users/login/check" element={<LoginCheck />} />
          <Route path="/account" element={<Account />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path={`/locations/:locationId`} element={<DetailLocation />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
