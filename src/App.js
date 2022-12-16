import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Main from './pages/Main';
import Profile from './pages/Profile'
import Setcli from './pages/Setcli';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Admin from './pages/Admin';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Setcli/>}/>
          <Route path='/signin' element={<Profile/>}/>
          <Route path='/home' element={<Main/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
