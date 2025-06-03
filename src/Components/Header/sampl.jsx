import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  // const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <header className={classes.main}>
      {/* Logo */}
      <Link to="/" className="text-white font-bold text-xl">
      <img src={logo} alt="" />
        <span className="text-yellow-400">Amazon</span> Clone
      </Link>

      {/* Search Bar */}
      <div className="flex flex-1 mx-4 max-w-2xl">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-l-md outline-none text-black"
        />
        <button className="bg-yellow-400 p-2 px-4 rounded-r-md text-black hover:bg-yellow-500">
          Search
        </button>
      </div>

      {/* Right Links */}
      <div className={classes.rights}>
        <Link to="/login" className="hover:underline">
          <div className={classes.orders}>
            <p>Hello, Sign in</p>
            <p className="font-bold">Account & Lists</p>
          </div>
        </Link>

        <Link to="/orders" className="hover:underline">
          <div>
            <p>Returns</p>
            <p className="font-bold">& Orders</p>
          </div>
        </Link>

        <Link to="/cart" className="relative hover:underline">
          <FaShoppingCart size={24} />
          {/* {cartItems.length > 0 && ( */}
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {/* {cartItems.length} */}0
            </span>
          {/* )} */}
        </Link>
      </div>
    </header>
  );
}

export default Header;
