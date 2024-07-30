import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
       <div className="navbar">
            <nav className="navbar-title">
                <Link to= "/" className="navbar-logo">Route Planner</Link>
            </nav>

            <div className="navbar-links">
                <Link to ="/Login">Login</Link>
                <Link to ="/NewAccount">Get Started</Link>
            </div>
       </div>
        
     );
}
 
export default Navbar;