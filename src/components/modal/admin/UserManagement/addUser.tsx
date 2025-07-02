import { useState } from "react";
import { AddUserDTO } from "../../../../app/models/user.model";
import { observer } from "mobx-react-lite";
import agent from "../../../../app/api/agent";
import Input from "../../../input/InputField";
import { toast } from "react-toastify";

const addModal = ({onClose}: {onClose: () => void}) => {

  const [user, setUser] = useState<AddUserDTO>({
    name: "",
    phoneNumber: "",
    email: "",
    birthday: new Date(),
    roleId: 0,
  });

  const handleAddUser = async () => {
    try {
      if (!user.name || !user.phoneNumber || !user.email) {
        toast.error("Please fill in all fields.");
        return;
      } else if (user.roleId === 0) {
        toast.error("Please select a role.");
        return;
      }
      const response = await agent.UserAdmin.addUser(user);
      if (response.success) {
        // Handle success, e.g., show a success message or update the UI
        console.log("User added successfully:", response.data);
        toast.success("User added successfully!");
        onClose(); // Close the modal after successful addition
      } else {
        // Handle error, e.g., show an error message
        console.error("Error adding user:", response.errors);
        toast.error("Error adding user: " + response.errors.join(", "));
      }
    } catch (error) {
      console.error("An error occurred while adding the user:", error);
      toast.error("An error occurred while adding the user: " + error);
    }
  };

  return (
    <div className= "items-center justify-center overflow-y-auto modal z-99999 mt-5">
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add new user</h2>

        <div className="space-y-3 text-sm text-gray-700">

          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Name:</span>
            <Input
              type="text"
              onChange={(e) => setUser({...user, name: e.target.value})}
              placeholder="Enter name"
            />
          </div>

          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Phone Number:</span>
            <Input
              type="text"
              onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Email:</span>
            <Input
              type="email"
              // onChange={(e) => user.email = e.target.value})}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="Enter Email"
            />
          </div>

          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Birthday:</span>
            <Input
              type="date"
              value={user.birthday instanceof Date ? user.birthday.toISOString().substring(0, 10) : ""}
              onChange={(e) => setUser({...user, birthday: e.target.value ? new Date(e.target.value) : new Date()})}
              placeholder="Select Birthday"
            />
          </div>

          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Role:</span>
            <select
              value={user.roleId}
              onChange={(e) => setUser({...user, roleId: parseInt(e.target.value)})}
              className={`w-full p-2 border rounded-lg`}
            >
              <option value={0}>Select Role</option>
              <option value={1}>Client</option>
              <option value={2}>Admin</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add User
          </button>
        </div>

      </div>
    </div>
  )

}

export default observer(addModal);
