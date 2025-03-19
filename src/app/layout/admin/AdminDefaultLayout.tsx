import "../App.css"
import AdminSideBar from "./AdminSideBar.tsx";
import {Outlet} from "react-router-dom";

const AdminDefaultLayout = () => {

    return (
        <div id="webcrumbs">
            <div className=" flex font-sans">

                <AdminSideBar/>

                <div className="flex-1 bg-slate-50 p-6">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AdminDefaultLayout;