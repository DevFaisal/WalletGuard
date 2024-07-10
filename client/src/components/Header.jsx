import { Link } from "react-router-dom";
import { useAuth } from "../context";

const Header = () => {
  const { user } = useAuth();

  const navlinks = user ? (
    <ul className="flex justify-end">
      <li className="mr-4">
        <Link
          to="/"
          className="text-white hover:text-gray-200 transition-colors duration-200"
        >
          Dashboard
        </Link>
      </li>
      <li className="mr-4">
        <Link
          to="/transactions"
          className="text-white hover:text-gray-200 transition-colors duration-200"
        >
          Transactions
        </Link>
      </li>
      <li>
        <button
          to="/logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload("/login");
          }}
          className="text-white hover:text-gray-200 transition-colors duration-200"
        >
          Logout
        </button>
      </li>
    </ul>
  ) : (
    <ul className="flex justify-end">
      <li className="mr-4">
        <Link
          to="/login"
          className="text-white hover:text-gray-200 transition-colors duration-200"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          className="text-white hover:text-gray-200 transition-colors duration-200"
        >
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="bg-slate-900 p-4 flex flex-col md:flex-row justify-center">
      <Link to="/" className="text-white text-xl font-bold mb-4 md:mb-0">
        WalletGuard
      </Link>
      <nav className="flex-grow">{navlinks}</nav>
    </header>
  );
};

export default Header;
