import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { action } from "mobx";
import { useModal } from "../../../hooks/useModal.ts";
import CategoryTable from "../../../components/admin/CategoryTable";
import Modal from "../../../components/modal";
import AddModal from "../../../components/modal/admin/CategoryManagement/addCategory";
import ViewModal from "../../../components/modal/admin/CategoryManagement/detailCategory";
import DeleteModal from "../../../components/modal/admin/CategoryManagement/deleteCategory";
import { CategoryDTO } from "../../../app/models/category.model";

const MovieManagement = () => {
  const { categoryStore } = useStore();
  const { categories, totalPages, totalItems, currentPage, pageSize } = categoryStore;

  console.log("MovieManagement render:", { currentPage, totalPages, moviesLength: categories.length });

  const { isOpen, openModal, closeModal } = useModal();
  const { isOpenDetail, openModalDetail, closeModalDetail } = useModal();
  const { isOpenAdd, openModalAdd, closeModalAdd } = useModal();
  const { isOpenDelete, openModalDelete, closeModalDelete } = useModal();
  const [ selectedCategory, setSelectedCategory ] = useState<CategoryDTO | null>(null);

  useEffect(() => {
    categoryStore.getAdminCategories();
  }, []);

  const handleCloseModal = async () => {
    closeModal(); 
    closeModalDetail(); 
    closeModalAdd(); 
    closeModalDelete()
    await categoryStore.getAdminCategories();
  }

  const handleAddCategory = () => {
    console.log("Add movie clicked");
    // Todo: Implement add functionality
    openModalAdd();
    openModal();
  };

  const handleDeleteCategory = (category: any) => {
    console.log("Delete category:", category);
    // TODO: Implement delete functionality
    setSelectedCategory(category);
    openModalDelete();
    openModal();
  };

  const handleViewCategory = (category: any) => {
    console.log("View category:", category);
    // TODO: Implement view functionality
    setSelectedCategory(category);
    openModalDetail();
    openModal();
  };

  const handlePageChange = action(async (page: number) => {
    console.log("CategoryManagement handlePageChange called with page:", page);
    categoryStore.setCurrentPage(page);
    await categoryStore.getAdminCategories();
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Categories</h1>
        <p className="text-slate-500 mt-1">Manage all system categories</p>
        {/* Next: "Add search and filter options" */}
      </header>

      <CategoryTable
        categories={categories}
        onAdd={handleAddCategory}
        onDelete={handleDeleteCategory}
        onView={handleViewCategory}
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
            {isOpenDetail && <ViewModal category={selectedCategory!} onClose={() => {handleCloseModal()}} />}
            {isOpenDelete && <DeleteModal idCategory={selectedCategory ? selectedCategory.id : 0} onClose={() => {handleCloseModal()}} />}
          </>
        }
      />

    </div>
  );
};

export default observer(MovieManagement);
