import { useState } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => {
      setAlert(null)
    }, 1599);
  }
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />}></Route>
            <Route exact path='/login' element={<Login showAlert={showAlert} />}></Route>
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />}></Route>
            <Route exact path='/about' element={<About showAlert={showAlert} />}></Route>
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
