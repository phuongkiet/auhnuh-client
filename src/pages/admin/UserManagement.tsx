import {useEffect} from "react";
import {Role, UserStatus} from "../../app/models/user.model.ts";
import {useStore} from "../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const UserManagement = () => {
    const {userStore} = useStore();
    const {adminList, userAdmin, total, pageNumber, term, setPageNumber, setTerm} = userStore;

    useEffect(() => {
        adminList();
        console.log("User Admin List: ", userAdmin);
    }, [pageNumber]);

    const getStatusLabel = (status: number) => {
        switch (status) {
            case UserStatus.Active:
                return "Active";
            case UserStatus.InActive:
                return "In Active";
            default:
                return "Unknown Status";
        }
    };

    const getRoleLabel = (role: number) => {
        switch (role) {
            case Role.Admin:
                return "Admin";
            case Role.Client:
                return "Client";
            default:
                return "Unknown Role";
        }
    }

    return(
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Users</h1>
                <p className="text-slate-500 mt-1">Manage all system users</p>
                {/* Next: "Add search and filter options" */}
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-slate-200">
                    <h2 className="font-semibold text-lg">User List</h2>
                    <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center">
                        <span className="material-symbols-outlined text-sm mr-1">add</span>
                        Add New User
                    </button>
                </div>

                <table className="w-full">
                    <thead>
                    <tr className="bg-slate-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone
                            Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">                   
                    {userAdmin.length > 0 ? (
                        userAdmin?.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">#{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div
                                            className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-medium">
                                            {item.name[0].toUpperCase()}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900">{item.name}</div>
                                            <div
                                                className="text-sm text-slate-500">Joined {new Date(item.createdAt).getFullYear()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.phoneNumber || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {getRoleLabel(item.roleId)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === UserStatus.Active ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                            {getStatusLabel(item.status)}
                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xl font-medium space-x-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200 hover:underline">
                                        <FaEye className="inline-block mr-1" />
                                    </button>
                                    <button
                                        className="text-emerald-600 hover:text-emerald-900 transition-colors duration-200 hover:underline">
                                        <FaPencilAlt className="inline-block mr-1" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900 transition-colors duration-200 hover:underline">
                                        <FaRegTrashCan className="inline-block mr-1" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-slate-500">No users found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200">
                    <div className="text-sm text-slate-500">
                        Showing <span className="font-medium">1</span> to <span
                        className="font-medium">5</span> of <span className="font-medium">25</span> results
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-50 transition-colors">
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                            1
                        </button>
                        <button
                            className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-50 transition-colors">
                            2
                        </button>
                        <button
                            className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-50 transition-colors">
                            3
                        </button>
                        <button
                            className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-50 transition-colors">
                            Next
                        </button>
                        {/* Next: "Add jump to page functionality" */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(UserManagement);