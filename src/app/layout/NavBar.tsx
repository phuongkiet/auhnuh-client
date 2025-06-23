import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import "../layout/App.css";
import { useStore } from "../stores/store.ts";
import { useEffect } from "react";

const NavBar = () => {
  const {
    userStore: { user, logout },
    categoryStore: { categories, getCategories },
  } = useStore();

  const currentUser = user;
  const navigate = useNavigate();

  const navLinks = [
    { id: 1, text: "Home", href: "/" },
    // Movies sẽ dùng onClick
    // { id: 2, text: "Movies", href: "/" },
  ];

  function handleLogout() {
    logout();
  }

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <header className="relative">
      <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-black to-transparent">
        <nav className="flex items-center justify-between px-12 py-4">
          <div className="flex items-center">
            <Link to="/" className="link">
              <h1 className="text-3xl font-bold text-red-600 mr-10">AuhNuh</h1>
            </Link>
            <ul className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link key={link.id} to={link.href}>
                  <li className="text-white hover:text-red-600 transition-colors duration-300">
                    {link.text}
                  </li>
                </Link>
              ))}
              <li
                className="text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate('/movies')}
              >
                Movies
              </li>
              <details className="relative cursor-pointer group">
                <summary className="list-none flex items-center">
                  <li className="text-white hover:text-red-600 transition-colors duration-300">
                    Categories
                  </li>
                  <span className="text-white material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                    arrow_drop_down
                  </span>
                </summary>
                <div className="opacity-95 absolute left mt-2 w-max bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-20 p-2 whitespace-nowrap">
                  <ul className="grid grid-cols-5 gap-7">
                    {categories.map((category, index) => (
                      <li
                        key={index}
                        className="text-white px-2 py-1 hover:bg-zinc-800 transition-colors duration-300 text-center cursor-pointer"
                        onClick={() => navigate(`/movies?categoryId=${category.id}`)}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="text-white material-symbols-outlined cursor-pointer hover:text-red-600 transition-colors duration-300">
                search
              </span>
            </div>
            <div className="relative">
              <span className="text-white material-symbols-outlined cursor-pointer hover:text-red-600 transition-colors duration-300">
                notifications
              </span>
              <span className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                3
              </span>
            </div>
            {currentUser ? (
              <details className="relative cursor-pointer group">
                <summary className="list-none flex items-center">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {currentUser?.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                    arrow_drop_down
                  </span>
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-20">
                  <ul className="py-2">
                    <li className="text-white px-4 py-2 hover:bg-zinc-800 transition-colors duration-300 flex items-center">
                      <span className="text-white material-symbols-outlined mr-2">
                        person
                      </span>
                      Profile
                    </li>
                    <li
                      className="border-t border-zinc-700 px-4 py-2 hover:bg-zinc-800 transition-colors duration-300 flex items-center text-red-500"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <span className="material-symbols-outlined mr-2">
                        logout
                      </span>
                      Sign Out
                    </li>
                  </ul>
                </div>
              </details>
            ) : (
              <details className="relative cursor-pointer group">
                <summary className="list-none flex items-center">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xs font-bold">WC</span>
                  </div>
                  <span className="text-white material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                    arrow_drop_down
                  </span>
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-20">
                  <ul className="py-2">
                    <Link to={"/login"}>
                      <li className="text-white px-4 py-2 hover:bg-zinc-800 transition-colors duration-300 flex items-center">
                        <span className="text-white material-symbols-outlined mr-2">
                          person
                        </span>
                        Login
                      </li>
                    </Link>
                  </ul>
                </div>
              </details>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default observer(NavBar);
