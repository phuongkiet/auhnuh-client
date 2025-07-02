import { CategoryDTO } from "../../../../app/models/category.model";
import { observer } from "mobx-react-lite";
import agent from "../../../../app/api/agent";
import Input from "../../../input/InputField";
import { toast } from "react-toastify";

const addModal = ({category, onClose}: {category: CategoryDTO, onClose: () => void}) => {

  const handleUpdateCategory = async () => {
    try {
      if (!category.name) {
        toast.error("Please fill in all fields.");
        return;
      }
      const response = await agent.Category.updateCategory(category.id, category);
      if (response.success) {
        // Handle success, e.g., show a success message or update the UI
        console.log("Category updated successfully:", response.data);
        toast.success("Category updated successfully!");
        onClose(); // Close the modal after successful addition
      } else {
        // Handle error, e.g., show an error message
        console.error("Error updating category:", response.errors);
        toast.error("Error updating category: " + response.errors.join(", "));
      }
    } catch (error) {
      console.error("An error occurred while updating the category:", error);
      toast.error("An error occurred while updating the category: " + error);
    }
  };

  const Detail = ({ label, value, isDisabled }: { label: string; value: any; isDisabled: boolean | true }) => (
    <div className="border-b p-2 space-y-2">
      <span className="font-semibold">{label}:</span>
      <Input
        type="text"
        onChange={(e) => {
          if (label === "Name") category.name = e.target.value;
          else if (label === "Description") category.description = e.target.value;
        }}
        disabled={isDisabled ? true : false}
        value={value}
      />
    </div>
  );

  return (
    <div className= "items-center justify-center overflow-y-auto modal z-99999 mt-5">
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add new category</h2>

        <div className="space-y-3 text-sm text-gray-700">

          <Detail label="Name" value={category.name} isDisabled={false} />
          <Detail label="Description" value={category.description} isDisabled={false} />

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpdateCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Update Category
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default observer(addModal);
