const UserManagement = () => {
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <tr key={item} className="hover:bg-slate-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">#{item}001</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div
                                        className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-medium">
                                        {String.fromCharCode(64 + item)}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-slate-900">User {item}</div>
                                        <div className="text-sm text-slate-500">Joined 2023</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">user{item}@example.com</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item % 2 === 0 ? 'Admin' : 'User'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                item % 3 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {item % 3 === 0 ? 'Pending' : 'Active'}
                                        </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button
                                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200 hover:underline">
                                    View
                                </button>
                                <button
                                    className="text-emerald-600 hover:text-emerald-900 transition-colors duration-200 hover:underline">
                                    Edit
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900 transition-colors duration-200 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
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

export default UserManagement;