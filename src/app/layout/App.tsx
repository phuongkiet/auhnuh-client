import {Outlet, useLocation} from "react-router-dom";
import {useStore} from "../stores/store.ts";
import {useEffect} from "react";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

function App() {

    const {commonStore, userStore} = useStore();
    const location = useLocation();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    return (
        <>
            {/*{*/}
            {/*    location.pathname.includes("/") ? <Outlet/> :*/}
            {/*        location.pathname === '/admin' || userStore.user?.role.includes('Admin') ?*/}
            {/*            <div className="app">*/}
            {/*                <NavBar/>*/}
            {/*                <Outlet/>*/}
            {/*            </div> : location.pathname === '/client' || userStore.user?.role.includes('Client') ?*/}
            {/*                <div className="app">*/}
            {/*                    <NavBar/>*/}
            {/*                    <Outlet/>*/}
            {/*                </div> : <div className="app">*/}
            {/*                    <NavBar/>*/}
            {/*                    <Outlet/>*/}
            {/*                </div>*/}
            {/*}*/}

            <div className="app">
                {/* Always show the NavBar unless on a special page */}
                {!location.pathname.includes("/login") && <NavBar/>}
                <NavBar/>
                <Outlet/>
                <Footer/>
            </div>
        </>
    )
}

export default App
