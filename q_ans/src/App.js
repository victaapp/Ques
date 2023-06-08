import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import Home_page from './Components/Home_page';
import { Route, Router, Routes } from 'react-router-dom';
import All_Questions from './Components/All_Questions';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Post_Question from './Components/Post_Question';
import Ques_Answer from './Components/Ques_Answer';

function App() {
  return (
    
    <div className="App">
      <Routes>
       <Route path='/' element={<Home_page/>} />
       <Route path='/All_Questions' element={<All_Questions />}/>
       <Route path='/Signin' element={<Signin />}/>
       <Route path='/Signup' element={<Signup />}/>
       <Route path='/Post_Question' element={<Post_Question/>} />
       <Route path='/Ques_Answer' element={<Ques_Answer/>}/>
      </Routes>
    </div>
  );
}

export default App;
