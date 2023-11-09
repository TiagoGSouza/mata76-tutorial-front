import './App.css';
import Home from './components/Home';
import Activities from './components/Activities';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Planejamento de atividades diárias.</h1>
        <BrowserRouter>
          <ul>
            <li> <Link to="/">Pagina Inicial </Link></li>
            <li> <Link to="/register">Criar Atividade </Link></li>
          </ul>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Activities />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
