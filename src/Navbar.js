import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <Link to="/"> <h1 className="text-slate-300">Route Planner</h1> </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;