import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
  
    return (
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <div>
          <Link to="/" className="px-4">Home</Link>
          <Link to="/products" className="px-4">Products</Link>
        </div>
  
        <div>
          {user ? (
            <>
              {user.role === "ROLE_ADMIN" && (
                <>
                  <Link to="/admin/products" className="px-4">Manage Products</Link>
                  <Link to="/admin/users" className="px-4">Manage Users</Link>
                  <Link to="/profile" className="px-4">Profile</Link>
                </>
              )}
              {user.role === "ROLE_USER" && (
                <Link to="/profile" className="px-4">Profile</Link>
              )}
              <button onClick={logout} className="px-4 bg-red-500 rounded-lg">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4">Login</Link>
              <Link to="/register" className="px-4">Register</Link>
            </>
          )}
        </div>
      </nav>
    );
  };
  
  export default Navbar;