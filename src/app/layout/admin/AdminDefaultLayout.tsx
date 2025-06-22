import "../App.css"
import AdminSideBar from "./AdminSideBar.tsx";
import {Outlet} from "react-router-dom";

const AdminDefaultLayout = () => {

    return (
        <div id="webcrumbs" className="min-h-screen">
            <div className="flex font-sans h-screen overflow-hidden">

                {/* Sidebar - Fixed width */}
                <div className="w-72 flex-shrink-0">
                    <AdminSideBar/>
                </div>

                {/* Main content - Flexible but with min-height */}
                <div className="flex-1 bg-slate-50 p-6 overflow-auto">
                    <div className="min-h-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDefaultLayout;