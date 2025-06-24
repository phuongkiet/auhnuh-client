import { observer } from "mobx-react-lite";
import { UserAdminDTO, UserStatus } from "../../app/models/user.model";
import { FaEye} from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useMemo } from "react";
import Pagination from "../../app/common/Pagination";
import { getRoleLabel, getStatusLabel } from "../../app/common/stringUtils";
import { FaGavel } from "react-icons/fa";

interface UserTableProps {
  users: UserAdminDTO[];
  onAdd?: () => void;
  onBan?: (user: UserAdminDTO) => void;
  onDelete?: (user: UserAdminDTO) => void;
  onView?: (user: UserAdminDTO) => void;
  itemsPerPage?: number;
  totalPages?: number;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const UserTable = ({ 
  users,
  onAdd,
  onBan, 
  onDelete, 
  onView,
  itemsPerPage = 10,
  totalPages = 1,
  totalItems = 0,
  currentPage = 1,
  onPageChange
}: UserTableProps) => {
  // Use server-side pagination if totalPages is provided, otherwise client-side
  const isServerSidePagination = totalPages > 1;
  const actualTotalPages = isServerSidePagination ? totalPages : Math.ceil(users.length / itemsPerPage);

  // Tính toán pagination
  const paginatedUsers = useMemo(() => {
    if (isServerSidePagination) {
      return users; // Server already paginated
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }, [users, currentPage, itemsPerPage, isServerSidePagination]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = isServerSidePagination 
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : Math.min(currentPage * itemsPerPage, users.length);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= actualTotalPages && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-slate-200 flex-shrink-0">
        <h2 className="font-semibold text-lg">User List</h2>
        <button 
          onClick={() => {onAdd && onAdd()}}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center">
          <span className="material-symbols-outlined text-sm mr-1">add</span>
          Add New User
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
            {users.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-medium">
                        {user.name[0].toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          Joined {new Date(user.createdAt).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {user.phoneNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {getRoleLabel(user.roleId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === UserStatus.Active ?
                          "bg-green-100 text-green-800"
                        : user.status === UserStatus.Banned ?
                          "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xl font-medium space-x-2">
                    {onView && (
                      <button
                        onClick={() => {onView(user)}}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200 hover:underline"
                      >
                        <FaEye className="inline-block mr-1" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {onDelete(user)}}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 hover:underline"
                        title="Delete"
                      >
                        <FaRegTrashCan className="inline-block mr-1" />
                      </button>
                    )}
                    {onBan && (
                      <button
                        onClick={() => onBan(user)}
                        className="text-emerald-600 hover:text-emerald-900 transition-colors duration-200 hover:underline"
                        title="Ban"
                      >
                        <FaGavel className="inline-block mr-1" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 flex-shrink-0 bg-white">
        <Pagination
          currentPage={currentPage}
          totalPages={actualTotalPages}
          onPageChange={handlePageChange}
          pageSize={itemsPerPage}
          startItem={startItem}
          endItem={endItem}
          totalItems={isServerSidePagination ? totalItems : users.length}
          />
      </div>
    </div>
  );
};

export default observer(UserTable); 