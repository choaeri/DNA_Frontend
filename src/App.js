import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './component/Home';
import Login from './component/login/Login';
import SignIn from './component/signin/Signin';
import Recommend from './component/Recommend/Recommend';
import ListView from './component/View/ListView/ListView';
import MapView from './component/View/MapView/MapView';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/listview" element={<ListView />} />
          <Route path="/mapview" element={<MapView />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
