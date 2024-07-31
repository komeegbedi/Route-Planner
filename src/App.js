//This file runs all the component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div className="App bg-gradient-to-r from-slate-800 to-cyan-900">
      <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
