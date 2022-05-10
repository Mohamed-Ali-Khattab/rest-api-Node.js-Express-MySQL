import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>  
    </div>
  );
}
export default App;
