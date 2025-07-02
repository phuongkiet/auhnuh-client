import { useState } from "react";
import { AddCategoryDTO } from "../../../../app/models/category.model";
import { observer } from "mobx-react-lite";
import agent from "../../../../app/api/agent";
import Input from "../../../input/InputField";
import { toast } from "react-toastify";

const addModal = ({onClose}: {onClose: () => void}) => {

  const [category, setCategory] = useState<AddCategoryDTO>({
    name: "",
    description: "",
  });

  const handleAddCategory = async () => {
    try {
      if (!category.name) {
        toast.error("Please fill in all fields.");
        return;
      }
      const response = await agent.Category.addCategory(category);
      if (response.success) {
        // Handle success, e.g., show a success message or update the UI
        console.log("Category added successfully:", response.data);
        toast.success("Category added successfully!");
        onClose(); // Close the modal after successful addition
      } else {
        // Handle error, e.g., show an error message
        console.error("Error adding category:", response.errors);
        toast.error("Error adding category: " + response.errors.join(", "));
      }
    } catch (error) {
      console.error("An error occurred while adding the category:", error);
      toast.error("An error occurred while adding the category: " + error);
    }
  };

  return (
    <div className= "items-center justify-center overflow-y-auto modal z-99999 mt-5">
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add new category</h2>

        <div className="space-y-3 text-sm text-gray-700">

          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Name:</span>
            <Input
              type="text"
              onChange={(e) => setCategory({...category, name: e.target.value})}
              placeholder="Enter name"
            />
          </div>

          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Description:</span>
            <Input
              type="text"
              onChange={(e) => setCategory({...category, description: e.target.value})}
              placeholder="Enter description"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Category
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default observer(addModal);
