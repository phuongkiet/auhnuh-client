import { Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store.ts";
import { useEffect } from "react";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import AdminDefaultLayout from "./admin/AdminDefaultLayout.tsx";

function App() {
    const { commonStore, userStore } = useStore();
    const location = useLocation();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    // Check if the user is on an admin route
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isAdmin = userStore.user?.role.includes("Admin");

    return (
        <div className="app">
            {isAdminRoute && isAdmin ? (
                <AdminDefaultLayout />
            ) : (
                <>
                    <NavBar />
                    <main className="flex-1 flex flex-col justify-center items-center">
                        <Outlet />
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default App;
