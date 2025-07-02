import { observer } from "mobx-react-lite";
import agent from "../../../../app/api/agent";
import { toast } from "react-toastify";

const deleteModal = ({idCategory, onClose}: {idCategory: number, onClose: () => void}) => {

  const handleDeleteCategory = async () => {
    try {
      const response = await agent.Category.deleteCategory(idCategory);
      if (response.success) {
        toast.success("Category deleted successfully!");
        onClose(); // Close the modal after successful deletion
      } else {
        // Handle error, e.g., show an error message
        console.error("Error deleting category:", response.errors);
        toast.error("Error deleting category: " + response.errors.join(", "));
      }
    } catch (error) {
      console.error("An error occurred while deleting the category:", error);
      toast.error("An error occurred while deleting the category: " + error);
    }
  };

  return (
    <div className= "items-center justify-center overflow-y-auto modal z-99999 mt-5">
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Category Deletion</h2>

        <p className="text-gray-700 mb-4 text-center">
          {`Are you sure you want to delete this category with id ${idCategory}? This action cannot be undone.`}
        </p>

        <div className="text-sm text-gray-700 inline-flex space-x-4 mb-4 float-right">

        <div className="">
          <button
            onClick={handleDeleteCategory}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Category
          </button>
        </div>

        <div className="">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>

        </div>
      </div>
    </div>
  )
}

export default observer(deleteModal);
