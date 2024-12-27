import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoutes from './routes/PrivateRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'

// Pages
import Home from './pages/Home'
import Admin from './layouts/Admin'
import CartaoControle from './pages/CartaoControle';
import Dashboard from './pages/Dashboard';
import Receituario from './pages/Receituario';

import menus from './routes/MenusSidebar';
import { Login } from './pages/Login';
import RequireAuth from './contexts/Auth/RequireAuth';
import Relatorios from './pages/Relatorios';
import Medicamentos from './pages/Medicamentos/Medicamentos';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<RequireAuth><Admin component={<Home />} /></RequireAuth>} />
            <Route path="/card" element={<RequireAuth><Admin component={<CartaoControle />} /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Admin component={<Dashboard />} /></RequireAuth>} />
            <Route path="/receituario" element={<RequireAuth><Admin component={<Receituario />} /></RequireAuth>} />
            <Route path="/medicamentos" element={<RequireAuth><Admin component={<Medicamentos />} /></RequireAuth>} />
            <Route path="/relatorios" element={<RequireAuth><Admin component={<Relatorios />} /></RequireAuth>} />
          </Route>
          <Route element={<Login />} path='/' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
