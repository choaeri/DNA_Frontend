import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './component/Home';
import Login from './component/login/Login';
import SignIn from './component/signin/Signin';
import Recommend from './component/Recommend/Recommend';
import PostCard from './component/PostCard/PostCard';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/postcard" element={<PostCard />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
