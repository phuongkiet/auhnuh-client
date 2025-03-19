import { NavLink, useLocation } from "react-router-dom";
import SystemSidebarLinkGroup from "../system/SystemSidebarLinkGroup.tsx";

const AdminSideBar = () => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <aside className="w-72 min-h-screen bg-slate-800 text-white p-4 shadow-lg">
            <div className="mb-8">
                <NavLink to={"/admin"}>
                    <h1 className="text-center text-red-500 text-2xl font-bold tracking-tight">AuhNuh System</h1>
                </NavLink>
            </div>

            {/* Movies Group */}
            <SystemSidebarLinkGroup activeCondition={pathname.includes("movies")}>
                {(handleClick, open) => (
                    <>
                        <button
                            onClick={handleClick}
                            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-slate-700 group w-full"
                        >
                            <span className="material-symbols-outlined mr-3 text-slate-400 group-hover:text-white">movie</span>
                            <span className="font-medium flex-1 text-left">Movies</span>
                            <span className="material-symbols-outlined">{open ? "expand_less" : "expand_more"}</span>
                        </button>
                        {open && (
                            <ul className="ml-6 mt-2 space-y-1">
                                <li>
                                    <NavLink to="/movies/all" className="block p-2 rounded-lg hover:bg-slate-700">
                                        All Movies
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/movies/add" className="block p-2 rounded-lg hover:bg-slate-700">
                                        Add Movie
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </>
                )}
            </SystemSidebarLinkGroup>

            {/* Users Group */}
            <SystemSidebarLinkGroup activeCondition={pathname.includes("users")}>
                {(handleClick, open) => (
                    <>
                        <button
                            onClick={handleClick}
                            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-slate-700 group w-full"
                        >
                            <span className="material-symbols-outlined mr-3">person</span>
                            <span className="font-medium flex-1 text-left">Users</span>
                            <span className="material-symbols-outlined">{open ? "expand_less" : "expand_more"}</span>
                        </button>
                        {open && (
                            <ul className="ml-6 mt-2 space-y-1">
                                <li>
                                    <NavLink to="/users/list" className="block p-2 rounded-lg hover:bg-slate-700">
                                        User List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/users/add" className="block p-2 rounded-lg hover:bg-slate-700">
                                        Add User
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </>
                )}
            </SystemSidebarLinkGroup>

            {/* Categories Group */}
            <SystemSidebarLinkGroup activeCondition={pathname.includes("categories")}>
                {(handleClick, open) => (
                    <>
                        <button
                            onClick={handleClick}
                            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-slate-700 group w-full"
                        >
                            <span className="material-symbols-outlined mr-3 text-slate-400 group-hover:text-white">category</span>
                            <span className="font-medium flex-1 text-left">Categories</span>
                            <span className="material-symbols-outlined">{open ? "expand_less" : "expand_more"}</span>
                        </button>
                        {open && (
                            <ul className="ml-6 mt-2 space-y-1">
                                <li>
                                    <NavLink to="/categories/list" className="block p-2 rounded-lg hover:bg-slate-700">
                                        All Categories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories/add" className="block p-2 rounded-lg hover:bg-slate-700">
                                        Add Category
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </>
                )}
            </SystemSidebarLinkGroup>
        </aside>
    );
};

export default AdminSideBar;
