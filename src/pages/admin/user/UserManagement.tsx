import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import UserTable from "../../../components/admin/UserTable";
import { useModal } from "../../../hooks/useModal.ts";
import Modal from "../../../components/modal";
import AddModal from "../../../components/modal/admin/UserManagement/addUser";
import ViewModal from "../../../components/modal/admin/UserManagement/detailUser.tsx";
import DeleteModal from "../../../components/modal/admin/UserManagement/deleteUser";
import BanModal from "../../../components/modal/admin/UserManagement/banUser.tsx";
import { UserAdminDTO } from "../../../app/models/user.model.ts";

const UserManagement = () => {
  const { userStore } = useStore();
  const { userAdmin, pageSize, currentPage, totalItems, totalPages } = userStore;

  console.log("UserManagement render:", { currentPage, totalPages, usersLength: userAdmin.length });

  const { isOpen, openModal, closeModal } = useModal();
  const { isOpenDetail, openModalDetail, closeModalDetail } = useModal();
  const { isOpenAdd, openModalAdd, closeModalAdd } = useModal();
  const { isOpenDelete, openModalDelete, closeModalDelete } = useModal();
  const { isOpenBan, openModalBan, closeModalBan } = useModal();
  const [ selectedUser, setSelectedUser ] = useState<UserAdminDTO | null>(null);

  useEffect(() => {
    userStore.getAdminUsers();
  }, []);

  const handleCloseModal = async () => {
    closeModal(); 
    closeModalDetail(); 
    closeModalAdd(); 
    closeModalDelete()
    closeModalBan();
    await userStore.getAdminUsers();
  }

  const handleAddUser = () => {
    openModalAdd();
    openModal();
  }

  const handleBanUser = (user: any) => {
    console.log("Ban user:", user);
    // TODO: Implement edit functionality
    setSelectedUser(user);
    openModalBan();
    openModal();
  };

  const handleDeleteUser = (user: any) => {
    console.log("Delete user:", user);
    // TODO: Implement delete functionality
    setSelectedUser(user);
    openModalDelete();
    openModal();
  };

  const handleViewUser = (user: any) => {
    console.log("View user:", user);
    // TODO: Implement view functionality
    setSelectedUser(user);
    openModalDetail();  
    openModal();
  };

  const handlePageChange = action(async (page: number) => {
    console.log("UserManagement handlePageChange called with page:", page);
    userStore.setCurrentPage(page);
    await userStore.getAdminUsers();
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
        onAdd={handleAddUser}
        onBan={handleBanUser}
        onDelete={handleDeleteUser}
        onView={handleViewUser}
        itemsPerPage={pageSize}
        totalPages={totalPages}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={isOpen}
        onClose={() => {handleCloseModal()}}
        className="w-auto h-auto min-w-[500px]"
        children= {
          <>
            {isOpenAdd && <AddModal onClose={() => {handleCloseModal()}} />}
            {isOpenDetail && <ViewModal user={selectedUser!} onClose={() => {handleCloseModal()}} />}
            {isOpenDelete && <DeleteModal idUser={selectedUser ? selectedUser.id : 0} onClose={() => {handleCloseModal()}} />}
            {isOpenBan && <BanModal idUser={selectedUser ? selectedUser.id : 0} onClose={() => {handleCloseModal()}} />}
          </>
        }
      />
    </div>
  );
};

export default observer(UserManagement);
