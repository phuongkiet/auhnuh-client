import { useEffect } from "react";
import { useStore } from "../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import UserTable from "../../../components/admin/UserTable";

const UserManagement = () => {
  const { userStore } = useStore();
  const {
    adminList,
    userAdmin,
    pageNumber,
    total,
  } = userStore;

  useEffect(() => {
    adminList();
  }, []);

  const handleEditUser = (user: any) => {
    console.log("Edit user:", user);
    // TODO: Implement edit functionality
  };

  const handleDeleteUser = (user: any) => {
    console.log("Delete user:", user);
    // TODO: Implement delete functionality
  };

  const handleViewUser = (user: any) => {
    console.log("View user:", user);
    // TODO: Implement view functionality
  };

  const handlePageChange = action(async (page: number) => {
    userStore.setPageNumber(page);
    await userStore.adminList();
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Users</h1>
        <p className="text-slate-500 mt-1">Manage all system users</p>
        {/* Next: "Add search and filter options" */}
      </header>

      <UserTable 
        users={userAdmin}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onView={handleViewUser}
        itemsPerPage={5}
        totalPages={total || 1}
        totalItems={userAdmin.length * (total || 1)}
        currentPage={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default observer(UserManagement);
