import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoutes from './routes/PrivateRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'

import Home from './pages/Home'
import Admin from './layouts/Admin'
import CartaoControle from './pages/CartaoControle';

import menus from './routes/MenusSidebar';
import { Login } from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Admin component={<Home />} />} path='/home' />
            <Route element={<Admin component={<CartaoControle />} />} path='/card' />
          </Route>
          <Route element={<Login />} path='/' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
