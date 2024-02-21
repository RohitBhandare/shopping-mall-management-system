import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Users from './components/Users';
import Malls from './components/Malls';
import Shops from './components/Shops';
import Items from './components/Items';
import OrderDetails from './components/OrderDetails';
import Customers from './components/Customers';
import { ToastContainer } from 'react-toastify';
import MLOps from './components/MLOps';
import Home from './components/Home';

function App() {

  return (
    <AuthProvider>
      <ToastContainer />
      <Router>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<ProtectedRoute />}>
            <Route path='dashboard' element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path='profile' element={<Home />} />
              <Route path='users' element={<Users />} />
              <Route path='malls' element={<Malls />} />
              <Route path='shops' element={<Shops />} />
              <Route path='items' element={<Items />} />
              <Route path='orders' element={<OrderDetails />} />
              <Route path='customers' element={<Customers />} />
              <Route path='mlops' element={<MLOps />} />
            </Route>
        </Route>
        <Route path='*' element={<Login/>} />
      </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
