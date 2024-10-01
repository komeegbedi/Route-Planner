import Home from './Home'; 
import Navbar from '../src/components/Navbar'; 

export default function IndexPage() {
  return (
    <div className="App bg-black">
      <Navbar />
      <div className="content">
        <Home />
      </div>
    </div>
  );
}
