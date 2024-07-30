import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-screen-xl flex flex-wrap justify-between max-auto p-4">
                <Link to="/" className="text-slate-300 text-2xl flex items-center space-x-3 rtl:space-x-reverse"> 
                    <FontAwesomeIcon icon={faRoute}/> 
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Route Planner</span>
                </Link>
                
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                        <li>
                            <Link to="/Login" className="block py-2 px-3 text-white">Login</Link>
                        </li>
                        <li>
                            <Link to="/GetStarted" className="block py-2 px-4 text-white bg-blue-700 text-sm text-center rounded-lg font-medium">Get Started</Link>
                        </li>

                    </ul>
                    
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;