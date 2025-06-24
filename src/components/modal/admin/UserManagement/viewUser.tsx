import { UserAdminDTO, UserStatus} from "../../../../app/models/user.model";
import { observer } from "mobx-react-lite";
import { getStatusLabel } from "../../../../app/common/stringUtils";
import Input from "../../../input/InputField";
import { toast } from "react-toastify";
import agent from "../../../../app/api/agent";

const viewModal = ({user, onClose}: {user: UserAdminDTO; onClose: () => void}) => {

  const handleUpdateUser = async () => {
    try {
      if (!user.name || !user.phoneNumber || !user.email) {
        toast.error("Please fill in all fields.");
        return;
      } else if (user.roleId === 0) {
        toast.error("Please select a role.");
        return;
      }
      const response = await agent.UserAdmin.adminUpdate(user.id, user);
      if (response.success) {
        // Handle success, e.g., show a success message or update the UI
        console.log("User updated successfully:", response.data);
        toast.success("User updated successfully!");
        onClose(); // Close the modal after successful addition
      } else {
        // Handle error, e.g., show an error message
        console.error("Error updating user:", response.errors);
        toast.error("Error updating user: " + response.errors.join(", "));
      }
    } catch (error) {
      console.error("An error occurred while updating the user:", error);
      toast.error("An error occurred while updating the user: " + error);
    }
  }

  const Detail = ({ label, value, isDisabled }: { label: string; value: any; isDisabled: boolean | true }) => (
    <div className="border-b p-2 space-y-2">
      <span className="font-semibold">{label}:</span>
      <Input
        type="text"
        onChange={(e) => {
          if (label === "Name") user.name = e.target.value;
          else if (label === "Phone Number") user.phoneNumber = e.target.value;
          else if (label === "Email") user.email = e.target.value;
        }}
        disabled={isDisabled ? true : false}
        value={value}
      />
    </div>
  );

  return (
    <div className= "items-center justify-center overflow-y modal z-99999 mt-2">
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">User Details</h2>

        {/* User Information */}
        <div className="text-md text-gray-700 grid grid-cols-2">
          <Detail label="Name" value={user.name} isDisabled={false} />
          <Detail label="Phone Number" value={user.phoneNumber} isDisabled={false} />
          <Detail label="Email" value={user.email} isDisabled={false} />
          
          {/* Birthday Input */}
          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Birthday:</span>
            <Input
              type="date"
              value={user.birthday ? new Date(user.birthday).toISOString().substring(0, 10) : ""}
              onChange={(e) => {user.birthday = e.target.value ? new Date(e.target.value) : new Date()}}
            />
          </div>

          <Detail label="Created At" value={`Joined ${new Date(user.createdAt).getFullYear()}`} isDisabled={true} />
          <Detail label="Updated At" value={new Date(user.updatedAt).toLocaleString("en-GB")} isDisabled={true} />

          {/* Role Selection */}
          <div className="border-b p-2 space-y-2">
            <span className="font-semibold">Role:</span>
              <select
                value={user.roleId}
                onChange={(e) => {user.roleId = parseInt(e.target.value)}}
                className={`w-full p-2 border rounded-lg`}
              >
                <option value={1}>Client</option>
                <option value={2}>Admin</option>
              </select>
          </div>

          {/* Status */}
          <div className="p-2 space-y-2 m-3 col-span-2">
              <span className="text-md font-semibold text-gray-700">Status:</span>
              <span className={`text-gray-800 rounded-lg ml-8 p-2 ${
                        user.status === UserStatus.Active ?
                          "bg-green-100 text-green-800"
                        : user.status === UserStatus.Banned ?
                          "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
              >
                {getStatusLabel(user.status)}
              </span>
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpdateUser}
            className="px-4 py-2 bg-orange-300 text-white rounded-lg hover:bg-orange-400 transition-colors"
          >
            Update User
          </button>
        </div>

      </div>
    </div>
  )


}

export default observer(viewModal);
