import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav>
            <div className=" relative flex flex-wrap justify-between max-auto p-8">
                <Link to="/" className="text-slate-300 text-2xl flex items-center space-x-3 rtl:space-x-reverse"> 
                    <FontAwesomeIcon icon={faRoute}/> 
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Route Planner</span>
                </Link>
                
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-normal tracking-normal flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                        <li>
                            <Link to="/About" className="block py-2 px-3 text-white">About</Link>
                        </li>
                        <li>
                            <Link to="/Login" className="block py-2 px-3 text-white">Log in</Link>
                        </li>
                        <li>
                            <Link to="/GetStarted" className="block py-2 px-4 text-black bg-slate-50 text-sm text-center rounded-lg font-medium">Sign up</Link>
                        </li>

                    </ul>
                    
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;