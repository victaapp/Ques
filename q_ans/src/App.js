import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home_page from './Components/Home_page';
import { Route, Router, Routes } from 'react-router-dom';
import All_Questions from './Components/All_Questions';
import Signin from './Components/Signin';
import Signup from './Components/Signup';

function App() {
  return (
    
    <div className="App">
      <Routes>
       <Route path='/' element={<Home_page/>} />
       <Route path='/All_Questions' element={<All_Questions />}/>
       <Route path='/Signin' element={<Signin />}/>
       <Route path='/Signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
